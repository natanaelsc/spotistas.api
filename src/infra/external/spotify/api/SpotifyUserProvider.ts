import type UserProvider from '../../../../application/provider/UserProvider';
import { Spotify, TimeRange } from '../../../api/Spotify';
import type Artist from '../dto/Artist';
import type Track from '../dto/Track';
import type User from '../dto/User';

export default class SpotifyUserProvider implements UserProvider {
  private readonly path = 'me';
  private readonly limit = 50;

  getUser = async (token: string): Promise<User> => {
    const user = await Spotify.api(this.path, token);
    return user as User;
  };

  getTopTracks = async (token: string, time_range: string, limit = this.limit): Promise<Track[]> => {
    time_range = this.setTimeRange(time_range);
    const topTracks = await Spotify.api(`${this.path}/top/tracks?time_range=${time_range}&limit=${limit}`, token);
    return topTracks.items as Track[];
  };

  getTopArtists = async (token: string, time_range: string, limit = this.limit): Promise<Artist[]> => {
    time_range = this.setTimeRange(time_range);
    const topArtists = await Spotify.api(`${this.path}/top/artists?time_range=${time_range}&limit=${limit}`, token);
    return topArtists.items as Artist[];
  };

  private readonly setTimeRange = (timeRange: string): string => {
    if (timeRange === 'short') return TimeRange.SHORT;
    if (timeRange === 'medium') return TimeRange.MEDIUM;
    if (timeRange === 'long') return TimeRange.LONG;
    return TimeRange.MEDIUM;
  };
}
