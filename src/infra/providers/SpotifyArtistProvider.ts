import { type ArtistProvider, type ArtistProviderDto, type TrackProviderDto } from '../../interfaces/providers';
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
