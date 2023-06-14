import { Router } from 'express';
import { controllerFactory } from '../../infra/factory/ControllerFactory';
import { Auth, Cache } from '../middlewares';

export class UserRouter {
  private static readonly prefix = '/me';
  private static readonly router = Router();
  private static readonly cache = Cache.middleware;
  private static readonly auth = Auth.middleware.user;
  private static factory;

  private static readonly routes = (): Router => {
    const router = Router();
    router.get('/', this.cache, this.factory.createGetUserController().handle);
    router.get('/top/tracks', this.factory.createGetUserTopTracksController().handle);
    router.get('/top/artists', this.factory.createGetUserTopArtistsController().handle);
    router.get('/top/genres', this.factory.createGetUserTopGenresController().handle);
    return router;
  };

  static create = (): Router => {
    return this.router.use(this.prefix, this.auth, this.routes());
  };

  static {
    this.factory = controllerFactory;
  }
}
