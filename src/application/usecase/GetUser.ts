import { type RepositoryFactory } from '../factory/RepositoryFactory';
import { type UserRepository } from '../repository/UserRepository';

export class GetUser {
  private readonly userRepository: UserRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.userRepository = repositoryFactory.createUserRepository();
  }

  execute = async (email: string): Promise<Output> => {
    const user = await this.userRepository.findByEmail(email);
    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
    };
  };
}

interface Output {
  id: string;
  name: string;
  email: string;
}
