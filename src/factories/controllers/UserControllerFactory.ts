import { SpotifyUserProvider } from '../../infra/providers';
import { TrackMapperProvider } from '../../mappers/providers';
import { ArtistMapperProvider } from '../../mappers/providers/ArtistMapperProvider';
import { UserMapperProvider } from '../../mappers/providers/UserMapperProvider';
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
