import { type Playlist } from '../interfaces/models/Playlist';
import { type PlaylistProvider } from '../providers/PlaylistProvider';
import { type SpotifyClientAuthProvider } from '../providers/implementations/SpotifyClientAuthProvider';

export class PlaylistService {
  constructor(
    private readonly clientAuthProvider: SpotifyClientAuthProvider,
    private readonly playlistProvider: PlaylistProvider
  ) {}

  getOurPlaylists = async (limit = 5): Promise<Playlist[]> => {
    const token = await this.clientAuthProvider.getAccessToken();
    const playlists = await this.playlistProvider.getOurPlaylists(token);
    const ourPlaylists: Playlist[] = playlists
      .map(playlist => ({
        id: playlist.id,
        name: playlist.name,
        image: playlist.images[0].url,
        description: playlist.description,
        external_url: playlist.external_urls.spotify,
      }))
      .slice(0, limit);
    return ourPlaylists;
  };
}
