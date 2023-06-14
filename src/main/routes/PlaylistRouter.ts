import { Router } from 'express';
import { controllerFactory } from '../../infra/factory/ControllerFactory';
import { Cache } from '../middlewares';

export class PlaylistRouter {
  private static readonly prefix = '/playlists';
  private static readonly router = Router();
  private static readonly cache = Cache.middleware;
  private static factory;

  private static readonly routes = (): Router => {
    const router = Router();
    router.get('/', this.factory.createGetOurPlaylistsController().handle);
    return router;
  };

  static create = (): Router => {
    return this.router.use(this.prefix, this.cache, this.routes());
  };

  static {
    this.factory = controllerFactory;
  }
}
