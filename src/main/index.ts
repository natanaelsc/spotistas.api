import 'dotenv/config';
import { Router } from 'express';
import Server from './Server';
import { ArtistRouter, OAuthRouter, PlaylistRouter, TrackRouter, UserRouter } from './routes';

const server = new Server();
const routes = Router();

routes.use(ArtistRouter.create());
routes.use(OAuthRouter.create());
routes.use(PlaylistRouter.create());
routes.use(TrackRouter.create());
routes.use(UserRouter.create());

server.use(routes);
server.start();
