import { type TrackProvider, type TrackProviderDto } from '../../application/provider/TrackProvider';
import { Spotify } from '../api/Spotify';

export class SpotifyTrackProvider implements TrackProvider {
  private readonly path = 'tracks';

  getTrack = async (id: string): Promise<TrackProviderDto> => {
    const trackProviderDto = await Spotify.api(`${this.path}/${id}`);
    return trackProviderDto as TrackProviderDto;
  };
}
