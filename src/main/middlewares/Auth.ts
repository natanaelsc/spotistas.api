import { type NextFunction, type Request, type Response } from 'express';
import type UserProvider from '../../application/provider/UserProvider';
import SpotifyUserProvider from '../../infra/external/spotify/api/SpotifyUserProvider';
import FetchAdapter from '../../infra/http/FetchAdapter';
import type HttpClient from '../../infra/http/HttpClient';
import { ErrorHandler } from '../../presentation/errors';
import { HttpStatus } from '../../presentation/http';
import { Cookie } from './Cookie';

export class Auth {
  private static userProvider: UserProvider;
  private static httpClient: HttpClient;

  public static readonly user = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const token = Cookie.get(req, 'token');
      if (token == null) return res.status(HttpStatus.FORBIDDEN).send({ error: 'missing token' });
      const user = await this.userProvider.getUser(token);
      if (user.id == null) return res.status(HttpStatus.UNAUTHORIZED).send({ error: 'invalid token' });
      next();
      return res.status(HttpStatus.OK);
    } catch (error) {
      ErrorHandler.catch(error);
      return res.status(HttpStatus.TOO_MANY_REQUESTS).send({ error: 'rate limits' });
    }
  };

  public static readonly middleware = {
    user: this.user,
  };

  static {
    this.httpClient = new FetchAdapter();
    this.userProvider = new SpotifyUserProvider(this.httpClient);
  }
}
