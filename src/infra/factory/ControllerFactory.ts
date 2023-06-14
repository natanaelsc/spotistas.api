import { PrismaClient } from '@prisma/client';
import { GetArtistMonthController } from '../../presentation/controllers/GetArtistMonthController';
import { GetMusicOfTheDayController } from '../../presentation/controllers/GetMusicOfTheDayController';
import { GetOAuthCallbackController } from '../../presentation/controllers/GetOAuthCallbackController';
import { GetOAuthRedirectUrlController } from '../../presentation/controllers/GetOAuthRedirectUrlController';
import { GetOurPlaylistsController } from '../../presentation/controllers/GetOurPlaylistsController';
import { GetTopMusicBrasilController } from '../../presentation/controllers/GetTopMusicBrasilController';
import { GetUserController } from '../../presentation/controllers/GetUserController';
import { GetUserTopArtistsController } from '../../presentation/controllers/GetUserTopArtistsController';
import { GetUserTopGenresController } from '../../presentation/controllers/GetUserTopGenresController';
import { GetUserTopTracksController } from '../../presentation/controllers/GetUserTopTracksController';
import { MapperFactory } from './MapperFactory';
import { ProviderFactory } from './ProviderFactory';
import { RepositoryFactory } from './RepositoryFactory';
import { UsecaseFactory } from './UsecaseFactory';

export class ControllerFactory {
  constructor(
    private readonly usecaseFactory: UsecaseFactory,
    private readonly providerFactory: ProviderFactory,
    private readonly mapperFactory: MapperFactory
  ) {}

  createGetOAuthRedirectUrlController = (): GetOAuthRedirectUrlController => {
    return new GetOAuthRedirectUrlController(this.providerFactory.createOAuthProvider());
  };

  createGetOAuthCallbackController = (): GetOAuthCallbackController => {
    return new GetOAuthCallbackController(this.providerFactory.createOAuthProvider());
  };

  createGetMusicOfTheDayController = (): GetMusicOfTheDayController => {
    return new GetMusicOfTheDayController(
      this.providerFactory.createTrackProvider(),
      this.providerFactory.createArtistProvider(),
      this.mapperFactory.createTrackMapper()
    );
  };

  createGetTopMusicBrasilController = (): GetTopMusicBrasilController => {
    return new GetTopMusicBrasilController(
      this.providerFactory.createPlaylistProvider(),
      this.mapperFactory.createTrackMapper()
    );
  };

  createGetUserController = (): GetUserController => {
    return new GetUserController(
      this.usecaseFactory,
      this.providerFactory.createUserProvider(),
      this.mapperFactory.createUserMapper()
    );
  };

  createGetUserTopTracksController = (): GetUserTopTracksController => {
    return new GetUserTopTracksController(
      this.providerFactory.createUserProvider(),
      this.mapperFactory.createTrackMapper()
    );
  };

  createGetUserTopArtistsController = (): GetUserTopArtistsController => {
    return new GetUserTopArtistsController(
      this.providerFactory.createUserProvider(),
      this.mapperFactory.createArtistMapper()
    );
  };

  createGetUserTopGenresController = (): GetUserTopGenresController => {
    return new GetUserTopGenresController(this.providerFactory.createUserProvider());
  };

  createGetArtistMonthController = (): GetArtistMonthController => {
    return new GetArtistMonthController(
      this.providerFactory.createArtistProvider(),
      this.mapperFactory.createTrackMapper()
    );
  };

  createGetOurPlaylistsController = (): GetOurPlaylistsController => {
    return new GetOurPlaylistsController(
      this.providerFactory.createPlaylistProvider(),
      this.mapperFactory.createPlaylistMapper()
    );
  };
}

const connection = new PrismaClient();
const repositoryFactory = new RepositoryFactory(connection);
const usecaseFactory = new UsecaseFactory(repositoryFactory);
const providerFactory = new ProviderFactory();
const mapperFactory = new MapperFactory();
const controllerFactory = new ControllerFactory(usecaseFactory, providerFactory, mapperFactory);

export { controllerFactory };
