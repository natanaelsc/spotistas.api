import { Router } from 'express';
import { HttpStatus } from '../../presentation/http';
import { Env } from '../config';
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

const address = Env.get('SERVER_ADDRESS');

routes.use('/', (_req, res) => {
  res.status(HttpStatus.OK).json({
    oauth: `${address}/oauth`,
    user_info: `${address}/me`,
    user_top_artists: `${address}/me/top/artists`,
    user_top_tracks: `${address}/me/top/tracks`,
    user_top_genres: `${address}/me/top/genres`,
    artist_month: `${address}/artists/month`,
    our_playlists: `${address}/playlists`,
    tracks: `${address}/tracks`,
    track_of_the_day: `${address}/tracks/day`,
    track_brazil: `${address}/tracks/topBrazil`,
  });
});

routes.use((_req, res) => {
  res.status(HttpStatus.NOT_FOUND).json({ message: 'not found' });
});

export default routes;
