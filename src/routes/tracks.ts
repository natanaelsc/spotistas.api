import { Router } from 'express';
import { TrackController } from '../controllers/TrackController';
import { TrackMapperProvider } from '../mappers/providers/TrackMapperProvider';
import { SpotifyArtistProvider } from '../providers/implementations/SpotifyArtistProvider';
import { SpotifyClientAuthProvider } from '../providers/implementations/SpotifyClientAuthProvider';
import { SpotifyPlaylistProvider } from '../providers/implementations/SpotifyPlaylistProvider';
import { SpotifyTrackProvider } from '../providers/implementations/SpotifyTrackProvider';
import { TrackService } from '../services/TrackService';

const router = Router();

const trackService = new TrackService(
  new SpotifyClientAuthProvider(),
  new SpotifyTrackProvider(),
  new SpotifyArtistProvider(),
  new SpotifyPlaylistProvider(),
  new TrackMapperProvider()
);
const trackController = new TrackController(trackService);

router.get('/', trackController.getTrack);
router.get('/day', trackController.getTrackOfTheDay);
router.get('/topBrazil', trackController.getTrack);

export default router as Router;
