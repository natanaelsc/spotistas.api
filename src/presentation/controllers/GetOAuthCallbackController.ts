import { type Request, type Response } from 'express';
import { type OAuthProvider } from '../../application/provider/OAuthProvider';
import { Env } from '../../main/config';
import { Cookie } from '../../main/middlewares';
import { ErrorHandler } from '../errors';
import { HttpStatus } from '../http';

export class GetOAuthCallbackController {
  private readonly stateKey = 'auth.state';

  constructor(private readonly oauthProvider: OAuthProvider) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { code, state } = req.query;
      const storedState = req.cookies != null ? Cookie.get(req, this.stateKey) : null;
      if (state !== storedState) return res.status(HttpStatus.BAD_REQUEST).send({ error: 'state mismatch' });
      Cookie.del(res, this.stateKey);
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
