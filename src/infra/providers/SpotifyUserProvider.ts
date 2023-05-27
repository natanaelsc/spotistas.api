import { type ArtistProviderDto } from '../../application/provider/ArtistProvider';
import { type TrackProviderDto } from '../../application/provider/TrackProvider';
import { type UserProvider, type UserProviderDto } from '../../application/provider/UserProvider';
import { Spotify, TimeRange } from '../api/Spotify';

export class SpotifyUserProvider implements UserProvider {
  private readonly path = 'me';
  private readonly time_range = TimeRange.MEDIUM as string;
  private readonly limit = 50;

  getUser = async (token: string): Promise<UserProviderDto> => {
    const user = await Spotify.api(this.path, token);
    return user as UserProviderDto;
  };

  getTopTracks = async (
    token: string,
    time_range = this.time_range,
    limit = this.limit
  ): Promise<TrackProviderDto[]> => {
    const topTracks = await Spotify.api(`${this.path}/top/tracks?time_range=${time_range}&limit=${limit}`, token);
    return topTracks.items as TrackProviderDto[];
  };

  getTopArtists = async (
    token: string,
    time_range = this.time_range,
    limit = this.limit
  ): Promise<ArtistProviderDto[]> => {
    const topArtists = await Spotify.api(`${this.path}/top/artists?time_range=${time_range}&limit=${limit}`, token);
    return topArtists.items as ArtistProviderDto[];
  };
}
