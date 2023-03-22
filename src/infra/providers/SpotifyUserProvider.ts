import {
  type ArtistProviderDto,
  type TrackProviderDto,
  type UserProvider,
  type UserProviderDto,
} from '../../interfaces/providers';
import { TimeRange } from '../apis/Spotify';
import { HttpClient } from '../http/HttpClient';

export class SpotifyUserProvider implements UserProvider {
  private readonly _path = 'me';
  private readonly time_range = TimeRange.MEDIUM as string;
  private readonly limit = 20;

  getUser = async (token: string): Promise<UserProviderDto> => {
    const user = await HttpClient.connect(this._path, token);
    return user as UserProviderDto;
  };

  getTopTracks = async (
    token: string,
    time_range = this.time_range,
    limit = this.limit
  ): Promise<TrackProviderDto[]> => {
    const topTracks = await HttpClient.connect(
      `${this._path}/top/tracks?time_range=${time_range}&limit=${limit}`,
      token
    );
    return topTracks.items as TrackProviderDto[];
  };

  getTopArtists = async (
    token: string,
    time_range = this.time_range,
    limit = this.limit
  ): Promise<ArtistProviderDto[]> => {
    const topArtists = await HttpClient.connect(
      `${this._path}/top/artists?time_range=${time_range}&limit=${limit}`,
      token
    );
    return topArtists.items as ArtistProviderDto[];
  };
}
