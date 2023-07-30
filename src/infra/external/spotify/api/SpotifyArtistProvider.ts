import type ArtistProvider from '../../../../application/provider/ArtistProvider';
import type HttpClient from '../../../http/HttpClient';
import Spotify from '../Spotify';
import type Artist from '../dto/Artist';
import type Track from '../dto/Track';

export default class SpotifyArtistProvider implements ArtistProvider {
  private readonly baseUrl = 'https://api.spotify.com/v1';
  private readonly path = 'artists';

  constructor(private readonly httpClient: HttpClient) {}

  getArtist = async (id: string): Promise<Artist> => {
    const token = await Spotify.getToken();
    const url = `${this.baseUrl}/${this.path}/${id}`;
    const artist = await this.httpClient.get<Artist>(url, token);
    return artist;
  };

  getArtistTopTracks = async (id: string): Promise<Track[]> => {
    const token = await Spotify.getToken();
    const url = `${this.baseUrl}/${this.path}/${id}/top-tracks?country=BR`;
    const data = await this.httpClient.get<{ tracks: Track[] }>(url, token);
    const { tracks } = data;
    return tracks;
  };
}
