import axios from 'axios';
import logger from '../../config/logger';
import { type ArtistProvider } from '../ArtistProvider';
import { type TrackProviderDto } from '../TrackProvider';

export class SpotifyArtistProvider implements ArtistProvider {
  // getArtistTopTracks = async (token: string, id: string): Promise<TrackProviderDto[]> => {
  //   const response: Response = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=BR`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   const data = await response.json();
  //   return data.tracks as TrackProviderDto[];
  // };

  getArtistTopTracks = async (token: string, id: string): Promise<TrackProviderDto[]> => {
    const { data } = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=BR`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    logger.debug(data);
    return data.tracks as TrackProviderDto[];
  };
}
