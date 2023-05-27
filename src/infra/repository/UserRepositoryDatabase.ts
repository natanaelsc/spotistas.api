import { type UserRepository } from '../../application/repository/UserRepository';
import { User } from '../../domain/entity/User';
import { type DatabaseConnection } from '../database/DatabaseConnection';

export class UserRepositoryDatabase implements UserRepository {
  constructor(private readonly connection: DatabaseConnection) {}

  save = async (user: User): Promise<void> => {
    await this.connection.query('INSERT INTO user (id, name, email) VALUES (?, ?, ?)', [
      user.getId(),
      user.getName(),
      user.getEmail(),
    ]);
  };

  findByEmail = async (email: string): Promise<User> => {
    const [user] = await this.connection.query('SELECT * FROM user WHERE email = ? LIMIT 1', [email]);
    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  };
}
