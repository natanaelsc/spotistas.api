import type RepositoryFactory from '../../infra/factory/RepositoryFactory';
import type UserRepository from '../repository/UserRepository';

export default class GetUser {
  private readonly userRepository: UserRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.userRepository = repositoryFactory.createUserRepository();
  }

  execute = async (email: string): Promise<Output> => {
    const user = await this.userRepository.findByEmail(email);
    return {
      id: user?.getId(),
      name: user?.getName(),
      email: user?.getEmail(),
    };
  };
}

interface Output {
  id?: string;
  name?: string;
  email?: string;
}
