import { SpotifyUserProvider } from '../../infra/providers';
import { UserMapperProvider } from '../../mappers/providers/UserMapperProvider';
import { UserController } from '../../presentation/controllers';
import { UserService } from '../../services/UserService';

export class UserControllerFactory {
  static create = (): UserController => {
    const userService = new UserService(new SpotifyUserProvider(), new UserMapperProvider());
    return new UserController(userService);
  };
}
