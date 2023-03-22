import { SpotifyArtistProvider } from '../../infra/providers';
import { TrackMapperProvider } from '../../mappers/providers';
import { ArtistController } from '../../presentation/controllers';
import { ArtistService } from '../../services/ArtistService';

export class ArtistControllerFactory {
  static create = (): ArtistController => {
    const artistService = new ArtistService(new SpotifyArtistProvider(), new TrackMapperProvider());
    return new ArtistController(artistService);
  };
}
