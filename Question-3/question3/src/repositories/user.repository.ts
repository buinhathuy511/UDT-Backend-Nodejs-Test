// import {inject} from '@loopback/core';
// import {DefaultCrudRepository} from '@loopback/repository';
// import {MongodbDataSource} from '../datasources';
// import {User, UserRelations} from '../models';

// export class UserRepository extends DefaultCrudRepository<
//   User,
//   typeof User.prototype.user_id,
//   UserRelations
// > {
//   constructor(
//     @inject('datasources.mongodb') dataSource: MongodbDataSource,
//   ) {
//     super(User, dataSource);
//   }
// }

import {User, UserRelations, UserCredentials} from '../models';
import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, juggler, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {UserCredentialsRepository} from './user-credentials.repository';
import {MongodbDataSource} from '../datasources';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.user_id,
  UserRelations
> {
  public readonly userCredentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof User.prototype.user_id
  >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
  ) {
    super(User, dataSource);
    this.userCredentials = this.createHasOneRepositoryFactoryFor(
      'userCredentials',
      userCredentialsRepositoryGetter,
    );
    this.registerInclusionResolver(
      'userCredentials',
      this.userCredentials.inclusionResolver,
    );
  }

  async findCredentials(
    userId: typeof User.prototype.user_id
  ): Promise<UserCredentials | null> {
    return this.userCredentials(userId).get();
  }
}
