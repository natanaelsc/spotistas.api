import { type RepositoryFactory } from '../../application/factory/RepositoryFactory';
import { type UserRepository } from '../../application/repository/UserRepository';
import { type DatabaseConnection } from '../database/DatabaseConnection';
import { UserRepositoryDatabase } from '../repository/UserRepositoryDatabase';

export class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(private readonly connection: DatabaseConnection) {}

  createUserRepository = (): UserRepository => {
    return new UserRepositoryDatabase(this.connection);
  };
}
