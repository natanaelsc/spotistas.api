/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import { ArtistRouter } from './ArtistRouter';
import { OAuthRouter } from './OAuthRouter';
import { PlaylistRouter } from './PlaylistRouter';
import { TrackRouter } from './TrackRouter';
import { UserRouter } from './UserRouter';

const routes = Router();

routes.use(ArtistRouter.create());
routes.use(OAuthRouter.create());
routes.use(PlaylistRouter.create());
routes.use(TrackRouter.create());
routes.use(UserRouter.create());

routes.use((_req, res) => {
  res.status(404).json({ message: 'not found' });
});

export default routes;
