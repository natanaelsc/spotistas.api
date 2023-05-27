import { TrackMapperDto } from '../../infra/mapper/dto/TrackMapperDto';
import { SpotifyArtistProvider, SpotifyPlaylistProvider, SpotifyTrackProvider } from '../../infra/providers';
import { TrackController } from '../../presentation/controllers';
import { TrackService } from '../../services/TrackService';

export class TrackControllerFactory {
  static create = (): TrackController => {
    const trackService = new TrackService(
      new SpotifyTrackProvider(),
      new SpotifyArtistProvider(),
      new SpotifyPlaylistProvider(),
      new TrackMapperDto()
    );
    return new TrackController(trackService);
  };
}
