import { type Request, type Response } from 'express';
import { Env } from '../config/Env';
import logger from '../config/logger';
import { generateRandomString } from '../helpers/crypto';
import { HttpStatus } from '../presentation/http';
import { Cookie } from './../middlewares/Cookie';
import { type OAuthProvider } from './../providers/OAuthProvider';

export class OAuthController {
  private readonly _stateKey = 'auth.state';

  constructor(private readonly oauthProvider: OAuthProvider) {}

  auth = (_req: Request, res: Response): Response => {
    const state = generateRandomString(16, 'base64url');
    Cookie.set(res, this._stateKey, state);
    const redirectUri = this.oauthProvider.getRedirectUri(state);
    res.status(HttpStatus.FOUND).redirect(redirectUri);
    return res.end();
  };

  callback = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { code, state } = req.query;
      const storedState = req.cookies != null ? Cookie.get(req, this._stateKey) : null;
      if (state !== storedState) return res.status(HttpStatus.BAD_REQUEST).send({ error: 'state mismatch' });
      Cookie.del(res, this._stateKey);
      const clientURI = Env.get('CLIENT_URI');
      const { access_token } = await this.oauthProvider.getToken(code as string);
      Cookie.set(res, 'token', access_token);
      res.status(HttpStatus.FOUND).redirect(clientURI);
    } catch (err) {
      logger.error(err);
      return res.status(HttpStatus.FORBIDDEN).send({ error: 'bad oauth request' });
    }
    return res.end();
  };
}
