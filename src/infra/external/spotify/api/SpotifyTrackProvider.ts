import type TrackProvider from '../../../../application/provider/TrackProvider';
import type HttpClient from '../../../http/HttpClient';
import Spotify from '../Spotify';
import type Track from '../dto/Track';

export default class SpotifyTrackProvider implements TrackProvider {
  private readonly baseUrl = 'https://api.spotify.com/v1';
  private readonly path = 'tracks';

  constructor(private readonly httpClient: HttpClient) {}

  getTrack = async (id: string): Promise<Track> => {
    const url = `${this.baseUrl}/${this.path}/${id}`;
    const token = await Spotify.getToken();
    const track = await this.httpClient.get<Track>(url, token);
    return track;
  };
}
