import type PlaylistProvider from '../../../../application/provider/PlaylistProvider';
import { Env } from '../../../../main/config';
import { Spotify } from '../../../api/Spotify';
import type Playlist from '../dto/Playlist';

export default class SpotifyPlaylistProvider implements PlaylistProvider {
  private readonly path = 'playlists';
  private readonly limit = 50;
  private readonly userId = Env.get('SPOTIFY_USER_ID');

  getPlaylist = async (id: string): Promise<Playlist> => {
    const playlist = await Spotify.api(`${this.path}/${id}`);
    return playlist as Playlist;
  };

  getOurPlaylists = async (limit = this.limit): Promise<Playlist[]> => {
    const data = await Spotify.api(`users/${this.userId}/playlists?limit=${limit}`);
    const playlists = data.items.map((playlist: Playlist) => ({
      id: playlist.id,
      name: playlist.name,
      description: playlist.description,
      images: playlist.images,
      followers: playlist.followers,
      external_urls: playlist.external_urls,
    }));
    return playlists as Playlist[];
  };
}
