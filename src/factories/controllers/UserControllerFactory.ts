import { ArtistMapperDto } from '../../infra/mapper/dto/ArtistMapperDto';
import { TrackMapperDto } from '../../infra/mapper/dto/TrackMapperDto';
import { UserMapperDto } from '../../infra/mapper/dto/UserMapperDto';
import { SpotifyUserProvider } from '../../infra/providers';
import { UserController } from '../../presentation/controllers';
import { UserService } from '../../services/UserService';

export class UserControllerFactory {
  static create = (): UserController => {
    const userService = new UserService(
      new SpotifyUserProvider(),
      new UserMapperDto(),
      new TrackMapperDto(),
      new ArtistMapperDto()
    );
    return new UserController(userService);
  };
}
