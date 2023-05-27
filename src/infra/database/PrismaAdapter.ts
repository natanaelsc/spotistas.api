import { PrismaClient } from '@prisma/client';
import { type DatabaseConnection } from './DatabaseConnection';

export class PrismaAdapter implements DatabaseConnection {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  connect = async (): Promise<void> => {
    await this.prisma.$connect();
  };

  close = async (): Promise<void> => {
    await this.prisma.$disconnect();
  };

  query = async (query: string, values?: any): Promise<any> => {
    const result = await this.prisma.$queryRaw(query, values);
    return result;
  };
}
