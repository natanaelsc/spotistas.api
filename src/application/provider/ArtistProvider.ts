import type Artist from '../../infra/external/spotify/dto/Artist';
import type Track from '../../infra/external/spotify/dto/Track';

export default interface ArtistProvider {
  getArtist: (id: string) => Promise<Artist>;
  getArtistTopTracks: (id: string) => Promise<Track[]>;
}
