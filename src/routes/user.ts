import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { Auth } from '../middlewares/Auth';
import { SpotifyUserProvider } from '../providers/implementations/SpotifyUserProvider';

const router = Router();

const userProvider = new SpotifyUserProvider();
const userController = new UserController(userProvider);

router.get('/', Auth.middleware.user, userController.handle);

export default router;
