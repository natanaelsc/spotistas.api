import { Router } from 'express';
import { controllerFactory } from '../../infra/factory/ControllerFactory';

export class OAuthRouter {
  private static readonly prefix = '/oauth';
  private static readonly router = Router();
  private static factory;

  private static readonly routes = (): Router => {
    const router = Router();
    router.get('/', this.factory.createGetOAuthRedirectUrlController().handle);
    router.get('/callback', this.factory.createGetOAuthCallbackController().handle);
    return router;
  };

  static create = (): Router => {
    return this.router.use(this.prefix, this.routes());
  };

  static {
    this.factory = controllerFactory;
  }
}
