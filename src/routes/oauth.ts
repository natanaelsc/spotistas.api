import { Router } from 'express';
import { OAuthController } from '../controllers/OAuthController';

const router = Router();

const oauthController = new OAuthController();

router.get('/', oauthController.auth);
router.get('/callback', oauthController.callback);

export default router;
