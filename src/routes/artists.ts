import { Router } from 'express';
import { ArtistController } from '../controllers/ArtistController';
import { ArtistRepository } from '../repositories/ArtistRepository';
import { ArtistService } from '../services/ArtistService';

const router = Router();

const artistController = new ArtistController(new ArtistService(new ArtistRepository()));

router.get('/month', artistController.getArtistMonth);

export default router;
