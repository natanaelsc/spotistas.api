import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import { type CookieOptions, type HttpRequest, type HttpResponse } from '../../presentation/http';
import { Env } from '../config/Env';
import logger from '../config/logger';

export class Cookie {
  private static readonly _secure = Env.isProduction();
  private static readonly _secret = Env.get('COOKIE_SECRET');

  private static readonly configure = (name?: string, secret = this._secret): CookieOptions => {
    return {
      name,
      secret,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax',
      path: '/',
      secure: this._secure,
      httpOnly: true,
    };
  };

  public static readonly middleware = {
    session: cookieSession(this.configure('session')),
    parser: cookieParser(),
  };

  public static readonly get = (req: HttpRequest, key: string): string => {
    return req.cookies[key];
  };

  public static readonly set = (res: HttpResponse, key: string, value: string): void => {
    res.cookie(key, value, this.configure());
  };

  public static readonly del = (res: HttpResponse, key: string): void => {
    res.clearCookie(key);
  };

  static {
    this._secure ? logger.debug('Cookie Security: ENABLED') : logger.warn('Cookie Security: DISABLED');
  }
}
