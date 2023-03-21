import { Router } from 'express';
import { SpotifyUserProvider } from '../../infra/providers';
import { UserController } from '../../presentation/controllers';
import { Auth } from '../middlewares';

const router = Router();

const userProvider = new SpotifyUserProvider();
const userController = new UserController(userProvider);

router.get('/', Auth.middleware.user, userController.handle);

export default router;
