import type Playlist from '../../infra/external/spotify/dto/Playlist';

export default interface PlaylistProvider {
  getPlaylist: (id: string) => Promise<Playlist>;
  getOurPlaylists: (limit: number) => Promise<Playlist[]>;
}
