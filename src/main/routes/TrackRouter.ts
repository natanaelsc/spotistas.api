import { Router } from 'express';
import { controllerFactory } from '../../infra/factory/ControllerFactory';
import { Cache } from '../middlewares/Cache';

export class TrackRouter {
  private static readonly prefix = '/tracks';
  private static readonly router = Router();
  private static readonly cache = Cache.middleware;
  private static factory;

  private static readonly routes = (): Router => {
    const router = Router();
    router.get('/', this.factory.createGetTopMusicBrasilController().handle);
    router.get('/day', this.factory.createGetMusicOfTheDayController().handle);
    router.get('/topBrazil', this.factory.createGetTopMusicBrasilController().handle);
    return router;
  };

  static create = (): Router => {
    return this.router.use(this.prefix, this.cache, this.routes());
  };

  static {
    this.factory = controllerFactory;
  }
}
