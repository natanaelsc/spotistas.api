import db from '../infra/database/db.json';
import { type MapperProvider } from '../interfaces/mappers/MapperProvider';
import { type ArtistMonth } from '../interfaces/models/Artist';
import { type Track } from '../interfaces/models/Track';
import { type ArtistProvider, type TrackProviderDto } from '../interfaces/providers';
import { ErrorHandler } from '../presentation/errors';

export class ArtistService {
  private readonly db = db.artists;

  constructor(
    private readonly artistProvider: ArtistProvider,
    private readonly trackMapperProvider: MapperProvider<Track, TrackProviderDto>
  ) {}

  getArtistMonth = async (): Promise<ArtistMonth | undefined> => {
    try {
      const artist = this.db[0];
      const topTracks = await this.artistProvider.getArtistTopTracks(artist.id);
      const tracks = this.trackMapperProvider.toModelList(topTracks);
      return {
        ...artist,
        tracks,
      };
    } catch (error) {
      ErrorHandler.catch(error);
    }
  };
}
