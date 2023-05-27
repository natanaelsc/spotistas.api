import { type RepositoryFactory } from '../../application/factory/RepositoryFactory';
import { CreateUser } from '../../application/usecase/CreateUser';
import { GetUser } from '../../application/usecase/GetUser';

export class UsecaseFactory {
  constructor(private readonly repositoryFactory: RepositoryFactory) {}

  createGetUser = (): GetUser => {
    return new GetUser(this.repositoryFactory);
  };

  createCreateUser = (): CreateUser => {
    return new CreateUser(this.repositoryFactory);
  };
}
