import { Router } from 'express';
import { ControllerFactory } from '../../infra/factory/ControllerFactory';
import { Cache } from '../middlewares/Cache';

export class ArtistRouter {
  private static readonly _prefix = '/artists';
  private static readonly _router = Router();
  private static readonly _cache = Cache.middleware;
  private static _factory;

  private static readonly routes = (): Router => {
    const router = Router();
    router.get('/month', this._factory.getArtistMonth);
    return router;
  };

  static create = (): Router => {
    return this._router.use(this._prefix, this._cache, this.routes());
  };

  static {
    this._factory = new ControllerFactory().createArtistController();
  }
}
