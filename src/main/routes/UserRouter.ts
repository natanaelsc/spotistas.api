import { Router } from 'express';
import { UserControllerFactory } from '../../factories/controllers';
import { Auth, Cache } from '../middlewares';

export class UserRouter {
  private static readonly _prefix = '/me';
  private static readonly _factory = UserControllerFactory.create();
  private static readonly _router = Router();
  private static readonly _cache = Cache.middleware;
  private static readonly _auth = Auth.middleware.user;

  private static readonly routes = (): Router => {
    const router = Router();
    router.get('/', this._factory.getUser);
    router.get('/top/tracks', this._factory.getUserTopTracks);
    router.get('/top/artists', this._factory.getUserTopArtists);
    router.get('/top/genres', this._factory.getUserTopGenres);
    return router;
  };

  static create = (): Router => {
    return this._router.use(this._prefix, this._cache, this._auth, this.routes());
  };
}
