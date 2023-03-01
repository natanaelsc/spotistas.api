import { type Request, type Response } from 'express';
import { OAuthProvider } from '../providers/OAuthProvider';

export class OAuthController {
  auth(_req: Request, res: Response): void {
    const state = 'state';
    const oauthProvider = new OAuthProvider();
    const redirectURI = oauthProvider.getRedirectUri(state);
    res.cookie('auth_state', state);
    res.status(200).redirect(redirectURI);
  }

  async callback(req: Request, res: Response): Promise<Response> {
    const { code, state } = req.query;
    const storedState = req.cookies !== null ? req.cookies['auth_state' as string] : null;
    try {
      const oauthProvider = new OAuthProvider();
      const data = await oauthProvider.getToken(code as string);
      if (state !== storedState) {
        return res.status(400).send({ error: 'state mismatch' });
      } else {
        return res.status(200).send({ data });
      }
    } catch (error) {
      return res.status(500).send({ message: 'Something went wrong' });
    }
  }
}
