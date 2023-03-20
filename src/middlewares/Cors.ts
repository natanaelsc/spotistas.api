import cors, { type CorsOptions } from 'cors';
import { type NextFunction, type Request, type Response } from 'express';
import { Env } from '../config/Env';
import logger from '../config/logger';

export class Cors {
  private static readonly _origin = Env.getList('CORS')[0].includes('*') ? false : Env.getList('CORS') ?? true;

  private static readonly configure = (): CorsOptions => {
    return {
      origin: this._origin,
    };
  };

  public static readonly middleware = (req: Request, res: Response, next: NextFunction): void => {
    cors(this.configure())(req, res, next);
  };

  static {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    this._origin ? logger.debug('CORS:', this._origin) : logger.warn('CORS: DISABLED');
  }
}
