import { User } from '../../core/users/entities/user.entity';

export interface IPolicyHandler {
  handle(user: User): boolean | Promise<boolean>;
}

export type PolicyHandlerCallback = (user: User) => boolean | Promise<boolean>;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;