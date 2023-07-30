import User from '../../domain/entity/User';
import type RepositoryFactory from '../../infra/factory/RepositoryFactory';
import type UserRepository from '../repository/UserRepository';

export default class CreateUser {
  private readonly userRepository: UserRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.userRepository = repositoryFactory.createUserRepository();
  }

  execute = async (input: Input): Promise<void> => {
    const user = User.create(input.id, input.name, input.email);
    await this.userRepository.save(user);
  };
}

interface Input {
  id: string;
  name: string;
  email: string;
}
