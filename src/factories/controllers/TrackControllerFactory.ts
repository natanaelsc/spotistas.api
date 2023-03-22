import {
  SpotifyArtistProvider,
  SpotifyClientAuthProvider,
  SpotifyPlaylistProvider,
  SpotifyTrackProvider,
} from '../../infra/providers';
import { TrackMapperProvider } from '../../mappers/providers';
import { TrackController } from '../../presentation/controllers';
import { TrackService } from '../../services/TrackService';

export class TrackControllerFactory {
  static create = (): TrackController => {
    const trackService = new TrackService(
      new SpotifyClientAuthProvider(),
      new SpotifyTrackProvider(),
      new SpotifyArtistProvider(),
      new SpotifyPlaylistProvider(),
      new TrackMapperProvider()
    );
    return new TrackController(trackService);
  };
}
