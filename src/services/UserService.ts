import { type MapperDto } from '../application/mapper/MapperDto';
import { type ArtistDto } from '../domain/dto/ArtistDto';
import { type TrackDto } from '../domain/dto/TrackDto';
import { type UserDto } from '../domain/dto/UserDto';
import { TimeRange } from '../infra/api/Spotify';
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
    private readonly userMapperDto: MapperDto<UserDto, UserProviderDto>,
    private readonly trackMapperDto: MapperDto<TrackDto, TrackProviderDto>,
    private readonly artistMapperDto: MapperDto<ArtistDto, ArtistProviderDto>
  ) {}

  getUser = async (token: string): Promise<UserDto | undefined> => {
    try {
      const userProviderDto = await this.userProvider.getUser(token);
      return this.userMapperDto.toDto(userProviderDto);
    } catch (error) {
      ErrorHandler.catch(error);
    }
  };

  getUserTopTracks = async (token: string, time: string, limit: number): Promise<TrackDto[] | undefined> => {
    try {
      const trackListProviderDto = await this.userProvider.getTopTracks(token, this.setTimeRange(time), limit);
      return this.trackMapperDto.toDtoList(trackListProviderDto);
    } catch (error) {
      ErrorHandler.catch(error);
    }
  };

  getUserTopArtists = async (token: string, time: string, limit: number): Promise<ArtistDto[] | undefined> => {
    try {
      const artistListProviderDto = await this.userProvider.getTopArtists(token, this.setTimeRange(time), limit);
      return this.artistMapperDto.toDtoList(artistListProviderDto);
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
