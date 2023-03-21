import { Router } from 'express';
import { PlaylistController } from '../controllers/PlaylistController';
import { SpotifyClientAuthProvider } from '../providers/implementations/SpotifyClientAuthProvider';
import { SpotifyPlaylistProvider } from '../providers/implementations/SpotifyPlaylistProvider';
import { PlaylistService } from '../services/PlaylistService';

const router = Router();

const playlistService = new PlaylistService(new SpotifyClientAuthProvider(), new SpotifyPlaylistProvider());
const playlistController = new PlaylistController(playlistService);

router.get('/', playlistController.getOurPlaylists);

export default router;
