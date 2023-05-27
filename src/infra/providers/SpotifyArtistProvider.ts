import { type ArtistProvider, type ArtistProviderDto } from '../../application/provider/ArtistProvider';
import { type TrackProviderDto } from '../../application/provider/TrackProvider';
import { Spotify } from '../api/Spotify';

export class SpotifyArtistProvider implements ArtistProvider {
  private readonly path = 'artists';

  getArtist = async (id: string): Promise<ArtistProviderDto> => {
    const artistProviderDto = await Spotify.api(`${this.path}/${id}`);
    return artistProviderDto as ArtistProviderDto;
  };

  getArtistTopTracks = async (id: string): Promise<TrackProviderDto[]> => {
    const trackProviderDto = await Spotify.api(`${this.path}/${id}/top-tracks?country=BR`);
    return trackProviderDto.tracks as TrackProviderDto[];
  };
}
