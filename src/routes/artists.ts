import { Router } from 'express';
import { ArtistController } from '../controllers/ArtistController';
import { SpotifyArtistProvider } from '../providers/implementations/SpotifyArtistProvider';
import { SpotifyClientAuthProvider } from '../providers/implementations/SpotifyClientAuthProvider';
import { ArtistRepository } from '../repositories/ArtistRepository';
import { ArtistService } from '../services/ArtistService';

const router = Router();

const artistController = new ArtistController(
  new ArtistService(new SpotifyClientAuthProvider(), new SpotifyArtistProvider(), new ArtistRepository())
);

router.get('/month', artistController.getArtistMonth);

export default router;
