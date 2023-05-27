import { Router } from 'express';
import { ControllerFactory } from '../../infra/factory/ControllerFactory';
import { Cache } from '../middlewares/Cache';

export class TrackRouter {
  private static readonly _prefix = '/tracks';
  private static readonly _router = Router();
  private static readonly _cache = Cache.middleware;
  private static _factory;

  private static readonly routes = (): Router => {
    const router = Router();
    router.get('/', this._factory.getTrack);
    router.get('/day', this._factory.getTrackOfTheDay);
    router.get('/topBrazil', this._factory.getTrack);
    return router;
  };

  static create = (): Router => {
    return this._router.use(this._prefix, this._cache, this.routes());
  };

  static {
    this._factory = new ControllerFactory().createTrackController();
  }
}
