import { Router } from 'express';
import { SpotifyClientAuthProvider, SpotifyPlaylistProvider } from '../../infra/providers';
import { PlaylistController } from '../../presentation/controllers';
import { PlaylistService } from '../../services/PlaylistService';

const router = Router();

const playlistService = new PlaylistService(new SpotifyClientAuthProvider(), new SpotifyPlaylistProvider());
const playlistController = new PlaylistController(playlistService);

router.get('/', playlistController.getOurPlaylists);

export default router;
