import { type MapperProvider } from '../interfaces/mappers/MapperProvider';
import { type ArtistProvider } from '../providers/ArtistProvider';
import { type ClientAuthProvider } from '../providers/ClientAuthProvider';
import { type PlaylistProvider } from '../providers/PlaylistProvider';
import { type TrackProvider, type TrackProviderDto } from '../providers/TrackProvider';
import db from './../database/db.json';
import { type MusicOfDay, type Track } from './../interfaces/models/Track';

export class TrackService {
  private readonly db = db;

  constructor(
    private readonly clientAuthProvider: ClientAuthProvider,
    private readonly trackProvider: TrackProvider,
    private readonly artistProvider: ArtistProvider,
    private readonly playlistProvider: PlaylistProvider,
    private readonly mapperProvider: MapperProvider<Track, TrackProviderDto>
  ) {}

  getTrack = async (id: string): Promise<Track> => {
    const token = await this.clientAuthProvider.getAccessToken();
    const trackProviderDto = await this.trackProvider.getTrack(token, id);
    return this.mapperProvider.toModel(trackProviderDto);
  };

  getTop = async (top = 'brazil', limit = 5): Promise<Track[]> => {
    const token = await this.clientAuthProvider.getAccessToken();
    const playlistProviderDto = await this.playlistProvider.getPlaylist(token, this.db.playlists[0].id);
    if (playlistProviderDto.tracks == null) return [];
    return this.mapperProvider.toModelList(playlistProviderDto.tracks.slice(0, limit));
  };

  getTrackOfTheDay = async (): Promise<MusicOfDay> => {
    const musicOfDay = this.db.tracks[0];
    const track = await this.getTrack(musicOfDay.id);
    const token = await this.clientAuthProvider.getAccessToken();
    const note = musicOfDay.note;
    if (track.artists == null) {
      return {
        ...track,
        note,
      };
    }
    const artistId = track.artists[0].id;
    const artist = await this.artistProvider.getArtist(token, artistId);
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
  };
}
