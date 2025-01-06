import {authenticate, TokenService} from '@loopback/authentication';
import {
  Credentials,
  MyUserService,
  TokenServiceBindings,
  User,
  UserRepository,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {
  model,
  property,
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  SchemaObject,
} from '@loopback/rest';
import {SecurityBindings, UserProfile, securityId} from '@loopback/security';
import {genSalt, hash, compare} from 'bcryptjs';
import _ from 'lodash';

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {}

  // Hash password
  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  // Define the schema for the request body register
  private static RegisterSchema: SchemaObject = {
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: {type: 'string'},
      password: {type: 'string'},
      name: {type: 'string'},
      address: {type: 'string'},
      email: {type: 'string'},
      phone_number: {type: 'string'},
      gender: {type: 'string'},
    },
  };

  // Customer registration
  @post('/users/customer/register')
  @response(200, {
    description: 'User registration',
    content: {
      'application/json': {
        schema: UserController.RegisterSchema,
      },
    },
  })
  async registerCustomer(
    @requestBody({
      content: {
        'application/json': {
          schema: UserController.RegisterSchema,
        },
      },
    })
    user: Omit<User, 'user_id'>,
  ): Promise<User> {
    user.role = 'customer';
    const hashedPassword = await this.hashPassword(user.password);
    const userWithoutPassword = _.omit(user, 'password');

    const createdUser = await this.userRepository.create(userWithoutPassword);
    await this.userRepository
      .userCredentials(createdUser.user_id)
      .create({password: hashedPassword});
    return createdUser; // save user to database
  }

  // Agency registration
  @post('/users/agency/register')
  @response(200, {
    description: 'User registration',
    content: {
      'application/json': {
        schema: UserController.RegisterSchema,
      },
    },
  })
  async registerAgency(
    @requestBody({
      content: {
        'application/json': {
          schema: UserController.RegisterSchema,
        },
      },
    })
    user: Omit<User, 'user_id'>,
  ): Promise<User> {
    user.role = 'agency';
    const hashedPassword = await this.hashPassword(user.password);
    const userWithoutPassword = _.omit(user, 'password');

    const createdUser = await this.userRepository.create(userWithoutPassword);
    await this.userRepository
      .userCredentials(createdUser.user_id)
      .create({password: hashedPassword});
    return createdUser; // save user to database
  }

  // User login
  @post('/users/login')
  @response(200, {
    description: 'User login',
    content: {
      'application/json': {
        schema: {type: 'object', properties: {token: {type: 'string'}}},
      },
    },
  })
  async userLogin(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    const foundUser = await this.userRepository.findOne({
      where: {username: credentials.username},
    });

    if (!foundUser) {
      throw new Error('Invalid username or password.');
    }

    const userCredentials = await this.userRepository.findCredentials(
      foundUser.user_id,
    );

    if (!userCredentials) {
      throw new Error('Invalid username or password.');
    }

    const passwordMatched = await compare(
      credentials.password,
      userCredentials.password,
    );

    if (!passwordMatched) {
      throw new Error('Invalid username or password.');
    }

    const userProfile: UserProfile = {
      [securityId]: foundUser.user_id,
      id: foundUser.user_id,
      name: foundUser.username,
    };

    const token = await this.jwtService.generateToken(userProfile);
    return {token};
  }
}
