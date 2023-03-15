import { Router } from 'express';
import { TrackController } from '../controllers/TrackController';
import { SpotifyClientAuthProvider } from '../providers/implementations/SpotifyClientAuthProvider';
import { SpotifyPlaylistProvider } from '../providers/implementations/SpotifyPlaylistProvider';
import { TrackService } from '../services/TrackService';

const router = Router();

const trackService = new TrackService(new SpotifyClientAuthProvider(), new SpotifyPlaylistProvider());
const trackController = new TrackController(trackService);

router.get('/', trackController.getTrack);
router.get('/topBrazil', trackController.getTrack);

export default router as Router;
