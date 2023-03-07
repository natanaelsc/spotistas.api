import { Router } from 'express';
import oauthRouter from './oauth';
import userRouter from './user';

const routes = Router();

routes.get('/', (_req, res) => res.send({ message: 'Hello World!' }));
routes.use('/oauth', oauthRouter);
routes.use('/me', userRouter);

export default routes;
