import { type ArtistProvider, type ArtistProviderDto } from '../ArtistProvider';
import { type TrackProviderDto } from '../TrackProvider';

export class SpotifyArtistProvider implements ArtistProvider {
  getArtist = async (token: string, id: string): Promise<ArtistProviderDto> => {
    const response: Response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data as ArtistProviderDto;
  };

  getArtistTopTracks = async (token: string, id: string): Promise<TrackProviderDto[]> => {
    const response: Response = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=BR`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.tracks as TrackProviderDto[];
  };
}
