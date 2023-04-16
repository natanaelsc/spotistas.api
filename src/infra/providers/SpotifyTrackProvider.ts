import { type TrackProvider, type TrackProviderDto } from '../../interfaces/providers';
import { Spotify } from '../api/Spotify';

export class SpotifyTrackProvider implements TrackProvider {
  private readonly path = 'tracks';

  getTrack = async (id: string): Promise<TrackProviderDto> => {
    const trackProviderDto = await Spotify.api(`${this.path}/${id}`);
    return trackProviderDto as TrackProviderDto;
  };
}
