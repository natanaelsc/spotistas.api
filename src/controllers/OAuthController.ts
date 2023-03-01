import { type Request, type Response } from 'express';
import { OAuthProvider } from '../providers/OAuthProvider';

export class OAuthController {
  auth(_req: Request, res: Response): void {
    const state = 'state';
    const oauthProvider = new OAuthProvider();
    const redirectURI = oauthProvider.getRedirectUri(state as string);
    res.cookie('auth_state', state);
    res.status(200).redirect(redirectURI);
  }
}
