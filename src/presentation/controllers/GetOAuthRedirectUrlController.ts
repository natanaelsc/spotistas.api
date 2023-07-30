import { type Request, type Response } from 'express';
import type OAuthProvider from '../../application/provider/OAuthProvider';
import { Crypt } from '../../infra/helpers';
import { Cookie } from '../../main/middlewares';
import { HttpStatus } from '../http';

export class GetOAuthRedirectUrlController {
  private readonly stateKey = 'auth.state';

  constructor(private readonly oauthProvider: OAuthProvider) {}

  handle = (_req: Request, res: Response): Response => {
    const state = Crypt.generate(16, 'base64url');
    Cookie.set(res, this.stateKey, state);
    const redirect_uri = this.oauthProvider.getRedirectUri(state);
    return res.status(HttpStatus.OK).json({ redirect_uri });
  };
}
