import type Artist from '../../infra/external/spotify/dto/Artist';
import type Track from '../../infra/external/spotify/dto/Track';
import type User from '../../infra/external/spotify/dto/User';

export default interface UserProvider {
  getUser: (token: string) => Promise<User>;
  getTopTracks: (token: string, time_range: string, limit?: number) => Promise<Track[]>;
  getTopArtists: (token: string, time_range: string, limit?: number) => Promise<Artist[]>;
}
