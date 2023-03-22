import { type SpotifyClientAuthProvider } from '../infra/providers';
import { type Playlist } from '../interfaces/models/Playlist';
import { type PlaylistProvider } from '../interfaces/providers';
import { ErrorHandler } from '../presentation/errors';

export class PlaylistService {
  constructor(
    private readonly clientAuthProvider: SpotifyClientAuthProvider,
    private readonly playlistProvider: PlaylistProvider
  ) {}

  getOurPlaylists = async (limit = 5): Promise<Playlist[]> => {
    try {
      const token = await this.clientAuthProvider.getAccessToken();
      const playlists = await this.playlistProvider.getOurPlaylists(token);
      return playlists
        .map(playlist => ({
          id: playlist.id,
          name: playlist.name,
          image: playlist.images[0].url,
          description: playlist.description,
          followers: playlist.followers?.total,
          external_url: playlist.external_urls.spotify,
        }))
        .slice(0, limit);
    } catch (error) {
      ErrorHandler.catch(error);
      return [];
    }
  };
}
