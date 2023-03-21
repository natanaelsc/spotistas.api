import { Router } from 'express';
import { OAuthControllerFactory } from '../../factories/controllers';

export class OAuthRouter {
  private static readonly _prefix = '/oauth';
  private static readonly _factory = OAuthControllerFactory.create();
  private static readonly _router = Router();

  private static readonly routes = (): Router => {
    const router = Router();
    router.get('/', this._factory.auth);
    router.get('/callback', this._factory.callback);
    return router;
  };

  static create = (): Router => {
    return this._router.use(this._prefix, this.routes());
  };
}
