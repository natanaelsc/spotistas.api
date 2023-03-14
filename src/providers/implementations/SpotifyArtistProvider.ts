import { type ArtistProvider, type TrackDto } from '../ArtistProvider';

export class SpotifyArtistProvider implements ArtistProvider {
  getArtistTopTracks = async (token: string, id: string): Promise<TrackDto[]> => {
    const response: Response = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=BR`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.tracks as TrackDto[];
  };
}
