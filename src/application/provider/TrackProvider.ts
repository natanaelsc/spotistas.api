import type Track from '../../infra/external/spotify/dto/Track';

export default interface TrackProvider {
  getTrack: (id: string) => Promise<Track>;
}
