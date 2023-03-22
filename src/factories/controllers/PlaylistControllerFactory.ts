import { SpotifyPlaylistProvider } from '../../infra/providers';
import { PlaylistController } from '../../presentation/controllers';
import { PlaylistService } from '../../services/PlaylistService';

export class PlaylistControllerFactory {
  static create = (): PlaylistController => {
    const playlistService = new PlaylistService(new SpotifyPlaylistProvider());
    return new PlaylistController(playlistService);
  };
}
