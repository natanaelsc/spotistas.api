import { Router } from 'express';
import { SpotifyArtistProvider } from '../../infra/providers/SpotifyArtistProvider';
import { SpotifyClientAuthProvider } from '../../infra/providers/SpotifyClientAuthProvider';
import { ArtistController } from '../../presentation/controllers/ArtistController';
import { ArtistService } from '../../services/ArtistService';

const router = Router();

const artistController = new ArtistController(
  new ArtistService(new SpotifyClientAuthProvider(), new SpotifyArtistProvider())
);

router.get('/month', artistController.getArtistMonth);

export default router;
