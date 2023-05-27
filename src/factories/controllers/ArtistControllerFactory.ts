import { TrackMapperDto } from '../../infra/mapper/dto/TrackMapperDto';
import { SpotifyArtistProvider } from '../../infra/providers';
import { ArtistController } from '../../presentation/controllers';
import { ArtistService } from '../../services/ArtistService';

export class ArtistControllerFactory {
  static create = (): ArtistController => {
    const artistService = new ArtistService(new SpotifyArtistProvider(), new TrackMapperDto());
    return new ArtistController(artistService);
  };
}
