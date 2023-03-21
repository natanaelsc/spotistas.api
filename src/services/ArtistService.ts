import { type ArtistMonth } from '../interfaces/models/Artist';
import { type Track } from '../interfaces/models/Track';
import { type ArtistProvider } from '../providers/ArtistProvider';
import { type ClientAuthProvider } from '../providers/ClientAuthProvider';
import db from './../database/db.json';

export class ArtistService {
  private readonly db = db.artists;

  constructor(
    private readonly clientAuthProvider: ClientAuthProvider,
    private readonly artistProvider: ArtistProvider
  ) {}

  getArtistMonth = async (): Promise<ArtistMonth> => {
    const artist = this.db[0];
    const token = await this.clientAuthProvider.getAccessToken();
    const topTracks = await this.artistProvider.getArtistTopTracks(token, artist.id);
    const tracks: Track[] = topTracks.map(track => ({
      id: track.id,
      name: track.name,
      image: track.album.images[0].url,
      preview_url: track.preview_url,
      external_url: track.external_urls.spotify,
      duration_ms: track.duration_ms,
      popularity: track.popularity,
      album: {
        id: track.album.id,
        name: track.album.name,
        image: track.album.images[0].url,
        release_date: track.album.release_date,
        external_url: track.album.external_urls.spotify,
      },
    }));
    return {
      ...artist,
      tracks,
    };
  };
}
