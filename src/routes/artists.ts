import { Router } from 'express';
import { ArtistController } from '../controllers/ArtistController';
import { SpotifyArtistProvider } from '../providers/implementations/SpotifyArtistProvider';
import { SpotifyClientAuthProvider } from '../providers/implementations/SpotifyClientAuthProvider';
import { ArtistService } from '../services/ArtistService';

const router = Router();

const artistController = new ArtistController(
  new ArtistService(new SpotifyClientAuthProvider(), new SpotifyArtistProvider())
);

router.get('/month', artistController.getArtistMonth);

export default router;
