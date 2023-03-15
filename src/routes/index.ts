import { Router } from 'express';
import artistsRouter from './artists';
import oauthRouter from './oauth';
import tracksRouter from './tracks';
import userRouter from './user';

const routes = Router();

routes.get('/', (_req, res) => res.send({ message: 'Hello World!' }));
routes.use('/oauth', oauthRouter);
routes.use('/me', userRouter);
routes.use('/artists', artistsRouter);
routes.use('/tracks', tracksRouter);

export default routes;
