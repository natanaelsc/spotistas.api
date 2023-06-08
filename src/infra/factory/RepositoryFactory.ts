import { type PrismaClient } from '@prisma/client';
import { type UserRepository } from '../../application/repository/UserRepository';
import { PrismaUserRepository } from '../repository/PrismaUserRepository';

export class RepositoryFactory {
  constructor(private readonly connection: PrismaClient) {}

  createUserRepository = (): UserRepository => {
    return new PrismaUserRepository(this.connection);
  };
}
