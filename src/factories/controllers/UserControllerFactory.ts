import { SpotifyUserProvider } from '../../infra/providers';
import { ArtistMapperProvider, TrackMapperProvider, UserMapperProvider } from '../../mappers/providers';
import { UserController } from '../../presentation/controllers';
import { UserService } from '../../services/UserService';

export class UserControllerFactory {
  static create = (): UserController => {
    const userService = new UserService(
      new SpotifyUserProvider(),
      new UserMapperProvider(),
      new TrackMapperProvider(),
      new ArtistMapperProvider()
    );
    return new UserController(userService);
  };
}
