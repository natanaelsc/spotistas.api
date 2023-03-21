import { Router } from 'express';
import {
  SpotifyArtistProvider,
  SpotifyClientAuthProvider,
  SpotifyPlaylistProvider,
  SpotifyTrackProvider,
} from '../../infra/providers';
import { TrackMapperProvider } from '../../mappers/providers';
import { TrackController } from '../../presentation/controllers';
import { TrackService } from '../../services/TrackService';

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
