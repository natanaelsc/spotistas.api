import { Router } from 'express';
import artistsRouter from './artists';
import oauthRouter from './oauth';
import userRouter from './user';

const routes = Router();

routes.get('/', (_req, res) => res.send({ message: 'Hello World!' }));
routes.use('/oauth', oauthRouter);
routes.use('/me', userRouter);
routes.use('/artists', artistsRouter);

export default routes;
