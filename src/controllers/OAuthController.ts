import { type Request, type Response } from 'express';
import config from '../config/env';
import { type OAuthProvider } from './../providers/OAuthProvider';

class OAuthController {
  private readonly stateKey = 'spotify_auth_state';
  private readonly clientUri = config.spotify.client_uri;

  constructor(private readonly oauthProvider: OAuthProvider) {}

  auth = (_req: Request, res: Response): void => {
    // TODO: Generate a random string or jwt to state
    const state = 'state';
    const redirectUri = this.oauthProvider.getRedirectUri(state);
    res.cookie(this.stateKey, state);
    res.status(200).redirect(redirectUri);
  };

  callback = async (req: Request, res: Response): Promise<Response> => {
    const { code, state } = req.query;
    const storedState = req.cookies !== null ? req.cookies[this.stateKey] : null;
    try {
      if (state !== storedState) return res.status(400).send({ error: 'state mismatch' });
      res.clearCookie(this.stateKey);
      const data = await this.oauthProvider.getToken(code as string);
      res.redirect(this.clientUri);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send({ message: 'Something went wrong' }).end();
    }
  };
}

export default OAuthController;
