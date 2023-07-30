import { type NextFunction, type Request, type Response } from 'express';
import SpotifyUserProvider from '../../infra/external/spotify/api/SpotifyUserProvider';
import { ErrorHandler } from '../../presentation/errors';
import { HttpStatus } from '../../presentation/http';
import { Cookie } from './Cookie';

export class Auth {
  private static _userProvider;

  public static readonly user = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const token = Cookie.get(req, 'token');
      if (token == null) return res.status(HttpStatus.FORBIDDEN).send({ error: 'missing token' });
      const user = await this._userProvider.getUser(token);
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
    this._userProvider = new SpotifyUserProvider();
  }
}
