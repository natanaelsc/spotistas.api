import { type ArtistProviderDto } from '../../application/provider/ArtistProvider';
import { type TrackProviderDto } from '../../application/provider/TrackProvider';
import { type UserProvider, type UserProviderDto } from '../../application/provider/UserProvider';
import { Spotify, TimeRange } from '../api/Spotify';

export class SpotifyUserProvider implements UserProvider {
  private readonly path = 'me';
  private readonly limit = 50;

  getUser = async (token: string): Promise<UserProviderDto> => {
    const user = await Spotify.api(this.path, token);
    return user as UserProviderDto;
  };

  getTopTracks = async (token: string, time_range: string, limit = this.limit): Promise<TrackProviderDto[]> => {
    time_range = this.setTimeRange(time_range);
    const topTracks = await Spotify.api(`${this.path}/top/tracks?time_range=${time_range}&limit=${limit}`, token);
    return topTracks.items as TrackProviderDto[];
  };

  getTopArtists = async (token: string, time_range: string, limit = this.limit): Promise<ArtistProviderDto[]> => {
    time_range = this.setTimeRange(time_range);
    const topArtists = await Spotify.api(`${this.path}/top/artists?time_range=${time_range}&limit=${limit}`, token);
    return topArtists.items as ArtistProviderDto[];
  };

  private readonly setTimeRange = (timeRange: string): string => {
    if (timeRange === 'short') return TimeRange.SHORT;
    if (timeRange === 'medium') return TimeRange.MEDIUM;
    if (timeRange === 'long') return TimeRange.LONG;
    return TimeRange.MEDIUM;
  };
}
