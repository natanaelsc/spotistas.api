import { SpotifyArtistProvider, SpotifyClientAuthProvider } from '../../infra/providers';
import { ArtistController } from '../../presentation/controllers';
import { ArtistService } from '../../services/ArtistService';

export class ArtistControllerFactory {
  static create = (): ArtistController => {
    const artistService = new ArtistService(new SpotifyClientAuthProvider(), new SpotifyArtistProvider());
    return new ArtistController(artistService);
  };
}
