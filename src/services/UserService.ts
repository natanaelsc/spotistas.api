import { type MapperProvider } from '../interfaces/mappers/MapperProvider';
import { type User } from '../interfaces/models/User';
import { type UserProvider, type UserProviderDto } from '../interfaces/providers';
import { ErrorHandler } from '../presentation/errors';

export class UserService {
  constructor(
    private readonly userProvider: UserProvider,
    private readonly userMapperProvider: MapperProvider<User, UserProviderDto>
  ) {}

  getUser = async (token: string): Promise<User | undefined> => {
    try {
      const userProviderDto = await this.userProvider.getUser(token);
      return this.userMapperProvider.toModel(userProviderDto);
    } catch (error) {
      ErrorHandler.catch(error);
    }
  };
}
