import { type Request, type Response } from 'express';
import { type OAuthProvider } from '../../application/provider/OAuthProvider';
import { Crypt } from '../../infra/helpers';
import { Env } from '../../main/config';
import { Cookie } from '../../main/middlewares';
import { ErrorHandler } from '../errors';
import { HttpStatus } from '../http';

export class OAuthController {
  private readonly _stateKey = 'auth.state';

  constructor(private readonly oauthProvider: OAuthProvider) {}

  auth = (_req: Request, res: Response): Response => {
    const state = Crypt.generate(16, 'base64url');
    Cookie.set(res, this._stateKey, state);
    const redirect_uri = this.oauthProvider.getRedirectUri(state);
    return res.status(HttpStatus.OK).json({ redirect_uri });
  };

  callback = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { code, state } = req.query;
      const storedState = req.cookies != null ? Cookie.get(req, this._stateKey) : null;
      if (state !== storedState) return res.status(HttpStatus.BAD_REQUEST).send({ error: 'state mismatch' });
      Cookie.del(res, this._stateKey);
      const clientURI = Env.get('CLIENT_URI');
      const { access_token } = await this.oauthProvider.exchangeCode(code as string);
      if (access_token == null) return res.status(HttpStatus.FORBIDDEN).send({ error: 'bad oauth request' });
      Cookie.set(res, 'token', access_token);
      res.status(HttpStatus.FOUND).redirect(clientURI);
    } catch (error) {
      const { status, message } = ErrorHandler.catch(error);
      return res.status(status).send({ error: message });
    }
    return res.end();
  };
}
