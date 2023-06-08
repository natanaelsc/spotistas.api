import { PrismaClient } from '@prisma/client';
import {
  ArtistController,
  OAuthController,
  PlaylistController,
  TrackController,
  UserController,
} from '../../presentation/controllers';
import { GetUserController } from '../../presentation/controllers/GetUserController';
import { ArtistService } from '../../services/ArtistService';
import { PlaylistService } from '../../services/PlaylistService';
import { TrackService } from '../../services/TrackService';
import { UserService } from '../../services/UserService';
import { ArtistMapperDto } from '../mapper/dto/ArtistMapperDto';
import { TrackMapperDto } from '../mapper/dto/TrackMapperDto';
import { UserMapperDto } from '../mapper/dto/UserMapperDto';
import {
  SpotifyArtistProvider,
  SpotifyOAuthProvider,
  SpotifyPlaylistProvider,
  SpotifyTrackProvider,
  SpotifyUserProvider,
} from '../providers';
import { RepositoryFactory } from './RepositoryFactory';
import { UsecaseFactory } from './UsecaseFactory';

export class ControllerFactory {
  createArtistController = (): ArtistController => {
    const artistService = new ArtistService(new SpotifyArtistProvider(), new TrackMapperDto());
    return new ArtistController(artistService);
  };

  createOAuthController = (): OAuthController => {
    const spotifyOAuthProvider = new SpotifyOAuthProvider();
    return new OAuthController(spotifyOAuthProvider);
  };

  createPlaylistController = (): PlaylistController => {
    const playlistService = new PlaylistService(new SpotifyPlaylistProvider());
    return new PlaylistController(playlistService);
  };

  createTrackController = (): TrackController => {
    const trackService = new TrackService(
      new SpotifyTrackProvider(),
      new SpotifyArtistProvider(),
      new SpotifyPlaylistProvider(),
      new TrackMapperDto()
    );
    return new TrackController(trackService);
  };

  createUserController = (): UserController => {
    const userService = new UserService(
      new SpotifyUserProvider(),
      new UserMapperDto(),
      new TrackMapperDto(),
      new ArtistMapperDto()
    );
    return new UserController(userService);
  };

  createGetUserController = (): GetUserController => {
    const connection = new PrismaClient();
    const repositoryFactory = new RepositoryFactory(connection);
    const usecaseFactory = new UsecaseFactory(repositoryFactory);
    const userProvider = new SpotifyUserProvider();
    const userMapperDto = new UserMapperDto();
    return new GetUserController(usecaseFactory, userProvider, userMapperDto);
  };
}
