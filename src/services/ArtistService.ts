import { type MapperDto } from '../application/mapper/MapperDto';
import { type ArtistMonthDto } from '../domain/dto/ArtistDto';
import { type TrackDto } from '../domain/dto/TrackDto';
import db from '../infra/database/db.json';
import { type ArtistProvider, type TrackProviderDto } from '../interfaces/providers';
import { ErrorHandler } from '../presentation/errors';

export class ArtistService {
  private readonly db = db.artists;

  constructor(
    private readonly artistProvider: ArtistProvider,
    private readonly trackMapperDto: MapperDto<TrackDto, TrackProviderDto>
  ) {}

  getArtistMonth = async (limit: number): Promise<ArtistMonthDto | undefined> => {
    try {
      const artist = this.db[0];
      const topTracks = await this.artistProvider.getArtistTopTracks(artist.id);
      const tracks = this.trackMapperDto.toDtoList(topTracks.slice(0, limit));
      return {
        ...artist,
        tracks,
      };
    } catch (error) {
      ErrorHandler.catch(error);
    }
  };
}
