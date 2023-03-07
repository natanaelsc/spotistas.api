import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import authMiddleware from '../middlewares/auth';
import { SpotifyUserProvider } from '../providers/implementations/SpotifyUserProvider';

const router = Router();

const userProvider = new SpotifyUserProvider();
const userController = new UserController(userProvider);

router.get('/', authMiddleware, userController.handle);

export default router;
