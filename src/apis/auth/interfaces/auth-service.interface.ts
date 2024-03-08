import { User } from 'src/apis/users/entities/user.entity';

export interface IAuthServiceLogin {
  id: string;
  password: string;
}

export interface IAuthServiceGetAccessToken {
  user: User;
}
