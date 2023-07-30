import type TrackProvider from '../../../../application/provider/TrackProvider';
import { Spotify } from '../../../api/Spotify';
import type Track from '../dto/Track';

export default class SpotifyTrackProvider implements TrackProvider {
  private readonly path = 'tracks';

  getTrack = async (id: string): Promise<Track> => {
    const track = await Spotify.api(`${this.path}/${id}`);
    return track as Track;
  };
}
