import { type ArtistMonth } from '../interfaces/models/Artist';
import { type Track } from '../interfaces/models/Track';
import { type ArtistProvider } from '../providers/ArtistProvider';
import { type ClientAuthProvider } from '../providers/ClientAuthProvider';
import { type ArtistRepository } from '../repositories/ArtistRepository';

export class ArtistService {
  constructor(
    private readonly clientAuthProvider: ClientAuthProvider,
    private readonly artistProvider: ArtistProvider,
    private readonly artistRepository: ArtistRepository
  ) {}

  getArtistMonth = async (): Promise<ArtistMonth> => {
    const artist = await this.artistRepository.getArtistMonth();
    const token = await this.clientAuthProvider.getAccessToken();
    const topTracks = await this.artistProvider.getArtistTopTracks(token, artist.id);
    const tracks: Track[] = topTracks.map(track => ({
      id: track.id,
      name: track.name,
      image: track.album.images[0].url,
      preview_url: track.preview_url,
      external_url: track.external_urls.spotify,
    }));
    return {
      ...artist,
      tracks,
    };
  };
}
