import { sign, verify } from 'jsonwebtoken';
import { Env } from '../../main/config';
import logger from '../../main/config/logger';

export default class Jwt {
  private static readonly _secret = Env.get('JWT_SECRET');
  private static readonly _expiresIn = Env.get('JWT_EXPIRES_IN');

  public static readonly sign = async (payload: Payload, expiresIn = this._expiresIn): Promise<string> => {
    return sign(payload, this._secret, { expiresIn });
  };

  public static readonly decode = async (token: string): Promise<Payload> => {
    return verify(token, this._secret, { ignoreExpiration: true }) as Payload;
  };

  public static readonly verify = async (token: string): Promise<boolean> => {
    try {
      return verify(token, this._secret) == null;
    } catch (error) {
      error instanceof Error && logger.error(error.message);
      return true;
    }
  };

  public static expiresInMinutes(expiresIn: number | undefined): number {
    expiresIn ??= 0;
    const now = new Date().getTime();
    const exp = new Date(expiresIn * 1000).getTime();
    return Math.round((exp - now) / 60000);
  }
}

export interface Payload {
  access_token: string;
  exp?: number;
  iat?: number;
}
