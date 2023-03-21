import { Router } from 'express';
import artistsRouter from './artists';
import oauthRouter from './oauth';
import playlistsRouter from './playlists';
import tracksRouter from './tracks';
import userRouter from './user';

const routes = Router();

routes.get('/', (_req, res) => res.send({ message: 'Hello World!' }));
routes.use('/oauth', oauthRouter);
routes.use('/me', userRouter);
routes.use('/artists', artistsRouter);
routes.use('/tracks', tracksRouter);
routes.use('/playlists', playlistsRouter);

export default routes;
