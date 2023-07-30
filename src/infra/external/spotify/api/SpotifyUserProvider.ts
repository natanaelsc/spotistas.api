import type UserProvider from '../../../../application/provider/UserProvider';
import logger from '../../../../main/config/logger';
import type HttpClient from '../../../http/HttpClient';
import Spotify from '../Spotify';
import type Artist from '../dto/Artist';
import type Track from '../dto/Track';
import type User from '../dto/User';

export default class SpotifyUserProvider implements UserProvider {
  private readonly baseUrl = 'https://api.spotify.com/v1';
  private readonly path = 'me';
  private readonly limit = 50;

  constructor(private readonly httpClient: HttpClient) {}

  getUser = async (token: string): Promise<User> => {
    const url = `${this.baseUrl}/${this.path}`;
    const user = await this.httpClient.get<User>(url, token);
    return user;
  };

  getTopTracks = async (token: string, time_range: string, limit = this.limit): Promise<Track[]> => {
    time_range = Spotify.setTimeRange(time_range);
    const url = `${this.baseUrl}/${this.path}/top/tracks?time_range=${time_range}&limit=${limit}`;
    const data = await this.httpClient.get<{ items: Track[] }>(url, token);
    const tracks = data.items;
    return tracks;
  };

  getTopArtists = async (token: string, time_range: string, limit = this.limit): Promise<Artist[]> => {
    time_range = Spotify.setTimeRange(time_range);
    const url = `${this.baseUrl}/${this.path}/top/artists?time_range=${time_range}&limit=${limit}`;
    const data = await this.httpClient.get<{ items: Artist[] }>(url, token);
    const artists = data.items;
    return artists;
  };
}
