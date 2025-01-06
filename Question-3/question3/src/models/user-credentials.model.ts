import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model()
export class UserCredentials extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  user_credentials_id?: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @belongsTo(() => User)
  userId: string; // Chỉ định mối quan hệ khóa ngoại đến User

  constructor(data?: Partial<UserCredentials>) {
    super(data);
  }
}

export interface UserCredentialsRelations {
  // describe navigational properties here
}

export type UserCredentialsWithRelations = UserCredentials &
  UserCredentialsRelations;
