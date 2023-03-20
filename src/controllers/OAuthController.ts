import { type Request, type Response } from 'express';
import { Env } from '../config/Env';
import logger from '../config/logger';
import { generateRandomString } from '../helpers/crypto';
import cookie from '../middlewares/cookie';
import { type OAuthProvider } from './../providers/OAuthProvider';

export class OAuthController {
  private readonly stateKey = 'auth_state';

  constructor(private readonly oauthProvider: OAuthProvider) {}

  auth = (_req: Request, res: Response): Response => {
    const state = generateRandomString(16, 'base64url');
    res.cookie(this.stateKey, state, cookie.options);
    const redirectUri = this.oauthProvider.getRedirectUri(state);
    res.status(302).redirect(redirectUri);
    return res.end();
  };

  callback = async (req: Request, res: Response): Promise<Response> => {
    const { code, state } = req.query;
    const storedState = req.cookies != null ? req.cookies[this.stateKey] : null;
    if (state !== storedState) return res.status(400).send({ error: 'state mismatch' });
    res.clearCookie(this.stateKey);
    try {
      const clientURI = Env.get('CLIENT_URI');
      const { access_token } = await this.oauthProvider.getToken(code as string);
      res.cookie('token', access_token, cookie.options);
      res.status(302).redirect(clientURI);
    } catch (err) {
      logger.error(err);
      return res.status(403).send({ message: 'bad oauth request' });
    }
    return res.end();
  };
}
