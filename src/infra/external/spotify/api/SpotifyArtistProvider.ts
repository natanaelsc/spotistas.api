import type ArtistProvider from '../../../../application/provider/ArtistProvider';
import { Spotify } from '../../../api/Spotify';
import type Artist from '../dto/Artist';
import type Track from '../dto/Track';

export default class SpotifyArtistProvider implements ArtistProvider {
  private readonly path = 'artists';

  getArtist = async (id: string): Promise<Artist> => {
    const artist = await Spotify.api(`${this.path}/${id}`);
    return artist as Artist;
  };

  getArtistTopTracks = async (id: string): Promise<Track[]> => {
    const track = await Spotify.api(`${this.path}/${id}/top-tracks?country=BR`);
    return track.tracks as Track[];
  };
}
