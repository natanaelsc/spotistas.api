import { type PrismaClient } from '@prisma/client';
import { type UserRepository } from '../../application/repository/UserRepository';
import { User } from '../../domain/entity/User';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  save = async (user: User): Promise<void> => {
    await this.prisma.user.create({
      data: {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
      },
    });
  };

  findByEmail = async (email: string): Promise<User | undefined> => {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (user == null) return undefined;
    return new User({
      id: user.id,
      name: user.name ?? '',
      email: user.email,
    });
  };
}
