import db from '../infra/database/db.json';
import { type MapperProvider } from '../interfaces/mappers/MapperProvider';
import { type MusicOfDay, type Track } from '../interfaces/models/Track';
import {
  type ArtistProvider,
  type PlaylistProvider,
  type TrackProvider,
  type TrackProviderDto,
} from '../interfaces/providers';
import { ErrorHandler } from '../presentation/errors';

export class TrackService {
  private readonly db = db;

  constructor(
    private readonly trackProvider: TrackProvider,
    private readonly artistProvider: ArtistProvider,
    private readonly playlistProvider: PlaylistProvider,
    private readonly trackMapperProvider: MapperProvider<Track, TrackProviderDto>
  ) {}

  getTrack = async (id: string): Promise<Track> => {
    const trackProviderDto = await this.trackProvider.getTrack(id);
    return this.trackMapperProvider.toModel(trackProviderDto);
  };

  getTop = async (top = 'brazil', limit = 5): Promise<Track[]> => {
    try {
      const playlistProviderDto = await this.playlistProvider.getPlaylist(this.db.playlists[0].id);
      const tracks = playlistProviderDto.tracks.items.map(item => item.track);
      return this.trackMapperProvider.toModelList(tracks).slice(0, limit);
    } catch (error) {
      ErrorHandler.catch(error);
      return [];
    }
  };

  getTrackOfTheDay = async (): Promise<MusicOfDay | undefined> => {
    try {
      const musicOfDay = this.db.tracks[0];
      const note = musicOfDay.note;
      const track = await this.getTrack(musicOfDay.id);
      if (track.artists == null) {
        return {
          ...track,
          note,
        };
      }
      const artistId = track.artists[0].id;
      const artist = await this.artistProvider.getArtist(artistId);
      return {
        ...track,
        artists: [
          {
            id: artist.id,
            name: artist.name,
            image: artist.images[0].url,
            genres: artist.genres,
            popularity: artist.popularity,
            external_url: artist.external_urls.spotify,
          },
        ],
        note,
      };
    } catch (error) {
      ErrorHandler.catch(error);
    }
  };
}
