import { type TrackProvider, type TrackProviderDto } from '../TrackProvider';

export class SpotifyTrackProvider implements TrackProvider {
  getTrack = async (token: string, id: string): Promise<TrackProviderDto> => {
    const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data as TrackProviderDto;
  };
}
