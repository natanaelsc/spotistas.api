import { SpotifyUserProvider } from '../../infra/providers';
import { UserController } from '../../presentation/controllers';

export class UserControllerFactory {
  static create = (): UserController => {
    const userProvider = new SpotifyUserProvider();
    return new UserController(userProvider);
  };
}
