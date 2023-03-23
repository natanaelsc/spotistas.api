import { TimeRange } from '../infra/apis/Spotify';
import { type MapperProvider } from '../interfaces/mappers/MapperProvider';
import { type Artist } from '../interfaces/models/Artist';
import { type Track } from '../interfaces/models/Track';
import { type User } from '../interfaces/models/User';
import {
  type ArtistProviderDto,
  type TrackProviderDto,
  type UserProvider,
  type UserProviderDto,
} from '../interfaces/providers';
import { ErrorHandler } from '../presentation/errors';

export class UserService {
  constructor(
    private readonly userProvider: UserProvider,
    private readonly userMapperProvider: MapperProvider<User, UserProviderDto>,
    private readonly trackMapperProvider: MapperProvider<Track, TrackProviderDto>,
    private readonly artistMapperProvider: MapperProvider<Artist, ArtistProviderDto>
  ) {}

  getUser = async (token: string): Promise<User | undefined> => {
    try {
      const userProviderDto = await this.userProvider.getUser(token);
      return this.userMapperProvider.toModel(userProviderDto);
    } catch (error) {
      ErrorHandler.catch(error);
    }
  };

  getUserTopTracks = async (token: string, time: string, limit: number): Promise<Track[] | undefined> => {
    try {
      const trackListProviderDto = await this.userProvider.getTopTracks(token, this.setTimeRange(time), limit);
      return this.trackMapperProvider.toModelList(trackListProviderDto);
    } catch (error) {
      ErrorHandler.catch(error);
    }
  };

  getUserTopArtists = async (token: string, time: string, limit: number): Promise<Artist[] | undefined> => {
    try {
      const artistListProviderDto = await this.userProvider.getTopArtists(token, this.setTimeRange(time), limit);
      return this.artistMapperProvider.toModelList(artistListProviderDto);
    } catch (error) {
      ErrorHandler.catch(error);
    }
  };

  getUserTopGenres = async (token: string, time: string, limit: number): Promise<string[] | undefined> => {
    try {
      const artists = await this.userProvider.getTopArtists(token, this.setTimeRange(time));
      const genres = artists.map(artist => artist.genres).flat();
      return Array.from(new Set(genres)).slice(0, limit);
    } catch (error) {
      ErrorHandler.catch(error);
    }
  };

  private readonly setTimeRange = (timeRange: string): string => {
    if (timeRange === 'short') return TimeRange.SHORT;
    if (timeRange === 'medium') return TimeRange.MEDIUM;
    if (timeRange === 'long') return TimeRange.LONG;
    return TimeRange.MEDIUM;
  };
}
