import { type TrackProvider, type TrackProviderDto } from '../../interfaces/providers';
import { Spotify } from '../apis/Spotify';
import { HttpClient } from '../http/HttpClient';

export class SpotifyTrackProvider implements TrackProvider {
  private readonly _path = 'tracks';

  getTrack = async (id: string): Promise<TrackProviderDto> => {
    const token = await Spotify.api();
    const trackProviderDto = await HttpClient.connect(`${this._path}/${id}`, token);
    return trackProviderDto as TrackProviderDto;
  };
}
