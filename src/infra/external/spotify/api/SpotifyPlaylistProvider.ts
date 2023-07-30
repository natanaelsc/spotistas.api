import type PlaylistProvider from '../../../../application/provider/PlaylistProvider';
import { Env } from '../../../../main/config';
import type HttpClient from '../../../http/HttpClient';
import Spotify from '../Spotify';
import type Playlist from '../dto/Playlist';

export default class SpotifyPlaylistProvider implements PlaylistProvider {
  private readonly baseUrl = 'https://api.spotify.com/v1';
  private readonly path = 'playlists';
  private readonly limit = 50;
  private readonly userId = Env.get('SPOTIFY_USER_ID');

  constructor(private readonly httpClient: HttpClient) {}

  getPlaylist = async (id: string): Promise<Playlist> => {
    const url = `${this.baseUrl}/${this.path}/${id}`;
    const token = await Spotify.getToken();
    const playlist = await this.httpClient.get<Playlist>(url, token);
    return playlist;
  };

  getOurPlaylists = async (limit = this.limit): Promise<Playlist[]> => {
    const url = `${this.baseUrl}/users/${this.userId}/playlists?limit=${limit}`;
    const token = await Spotify.getToken();
    const data = await this.httpClient.get<{ items: Playlist[] }>(url, token);
    const playlists = data.items;
    return playlists;
  };
}
