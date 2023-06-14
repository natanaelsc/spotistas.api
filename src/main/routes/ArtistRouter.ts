import { Router } from 'express';
import { controllerFactory } from '../../infra/factory/ControllerFactory';
import { Cache } from '../middlewares/Cache';

export class ArtistRouter {
  private static readonly prefix = '/artists';
  private static readonly router = Router();
  private static readonly cache = Cache.middleware;
  private static factory;

  private static readonly routes = (): Router => {
    const router = Router();
    router.get('/month', this.factory.createGetArtistMonthController().handle);
    return router;
  };

  static create = (): Router => {
    return this.router.use(this.prefix, this.cache, this.routes());
  };

  static {
    this.factory = controllerFactory;
  }
}
