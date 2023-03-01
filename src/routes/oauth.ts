import { Router } from 'express';
import { OAuthController } from '../controllers/OAuthController';

const router = Router();

router.get('/', new OAuthController().auth);

export default router;
