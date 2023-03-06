import { Router } from 'express';
import { OAuthController } from '../controllers/OAuthController';
import { SpotifyOAuthProvider } from '../providers/implementations/SpotifyOAuthProvider';

const router = Router();

const spotifyOAuthProvider = new SpotifyOAuthProvider();
const oauthController = new OAuthController(spotifyOAuthProvider);

router.get('/', oauthController.auth);
router.get('/callback', oauthController.callback);

export default router;
