import { Router } from 'express';
import { PlaylistControllerFactory } from '../../factories/controllers';
import { Cache } from '../middlewares';

export class PlaylistRouter {
  private static readonly _prefix = '/playlists';
  private static readonly _factory = PlaylistControllerFactory.create();
  private static readonly _router = Router();
  private static readonly _cache = Cache.middleware;

  private static readonly routes = (): Router => {
    const router = Router();
    router.get('/', this._factory.getOurPlaylists);
    return router;
  };

  static create = (): Router => {
    return this._router.use(this._prefix, this._cache, this.routes());
  };
}
