import { type ArtistProvider } from '../providers/ArtistProvider';
import { type ClientAuthProvider } from '../providers/ClientAuthProvider';
import { type PlaylistProvider } from '../providers/PlaylistProvider';
import { type TrackProvider } from '../providers/TrackProvider';
import db from './../database/db.json';
import { type MusicOfDay, type Track } from './../interfaces/models/Track';

export class TrackService {
  private readonly db = db;

  constructor(
    private readonly clientAuthProvider: ClientAuthProvider,
    private readonly trackProvider: TrackProvider,
    private readonly artistProvider: ArtistProvider,
    private readonly playlistProvider: PlaylistProvider
  ) {}

  getTrack = async (id: string): Promise<Track> => {
    const token = await this.clientAuthProvider.getAccessToken();
    const track = await this.trackProvider.getTrack(token, id);
    return {
      id: track.id,
      name: track.name,
      image: track.album.images[0].url,
      preview_url: track.preview_url,
      external_url: track.external_urls.spotify,
      duration_ms: track.duration_ms,
      popularity: track.popularity,
      artists: track.artists.map(artist => ({
        id: artist.id,
        name: artist.name,
        genres: artist.genres,
        popularity: artist.popularity,
        external_url: artist.external_urls.spotify,
      })),
      album: {
        id: track.album.id,
        name: track.album.name,
        image: track.album.images[0].url,
        release_date: track.album.release_date,
        external_url: track.album.external_urls.spotify,
      },
    };
  };

  getTop = async (top = 'brazil', limit = 5): Promise<Track[]> => {
    const token = await this.clientAuthProvider.getAccessToken();
    const playlist = await this.playlistProvider.getPlaylist(token, this.db.playlists[0].id);
    if (playlist.tracks == null) return [];
    const tracks: Track[] = playlist.tracks
      .map(track => ({
        id: track.id,
        name: track.name,
        image: track.album.images[0].url,
        preview_url: track.preview_url,
        external_url: track.external_urls.spotify,
        duration_ms: track.duration_ms,
        popularity: track.popularity,
        artists: track.artists.map(artist => ({
          id: artist.id,
          name: artist.name,
          genres: artist.genres,
          popularity: artist.popularity,
          external_url: artist.external_urls.spotify,
        })),
        album: {
          id: track.album.id,
          name: track.album.name,
          image: track.album.images[0].url,
          release_date: track.album.release_date,
          external_url: track.album.external_urls.spotify,
        },
      }))
      .slice(0, limit);
    return tracks;
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
