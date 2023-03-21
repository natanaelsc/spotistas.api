import { Router } from 'express';
import { SpotifyOAuthProvider } from '../../infra/providers';
import { OAuthController } from '../../presentation/controllers';

const router = Router();

const spotifyOAuthProvider = new SpotifyOAuthProvider();
const oauthController = new OAuthController(spotifyOAuthProvider);

router.get('/', oauthController.auth);
router.get('/callback', oauthController.callback);

export default router;
