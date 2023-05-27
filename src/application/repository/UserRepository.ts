import { type User } from '../../domain/entity/User';

export interface UserRepository {
  save: (user: User) => Promise<void>;
  findByEmail: (email: string) => Promise<User>;
}
