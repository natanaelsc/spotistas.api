/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextFunction, type Request, type Response } from 'express';
import NodeCache from 'node-cache';
import { ErrorHandler } from '../../presentation/errors';
import { HttpStatus } from '../../presentation/http';
import { Env } from '../config';
import logger from '../config/logger';

export class Cache {
  private static _cache: NodeCache;
  private static readonly _stdTTL = Env.stdTTL;
  private static readonly _checkperiod = Number(Env.get('CACHE_CHECKPERIOD', '120'));

  private static readonly configure = (stdTTL = this._stdTTL): NodeCache.Options => {
    return { stdTTL, checkperiod: this._checkperiod * 0.2, useClones: false };
  };

  public static readonly middleware = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const key = this.setKey(req.originalUrl);
      logger.debug('Cache Key:', key);
      logger.debug('Cache Stats:', this._cache.getStats());
      if (this._cache.has(key)) return res.status(HttpStatus.OK).json(this._cache.get(key));
      next();
      return res.status(HttpStatus.OK);
    } catch (error) {
      ErrorHandler.catch(error);
      return res.status(HttpStatus.SERVER_ERROR).send({ message: 'internal server error' });
    }
  };

  public static readonly get = (key: string, value?: any): any => {
    key = this.setKey(key);
    return this._cache.get(key) ?? this._cache.set(key, value);
  };

  public static readonly clear = (): void => {
    this._cache.flushAll();
  };

  public static readonly del = (key: string): void => {
    this._cache.del(this.setKey(key));
  };

  private static readonly setKey = (key: string): string => {
    key = key.replace(/\/$/, '');
    key = key.endsWith('/') ? key.replace('/', '') : key;
    return key;
  };

  private static readonly init = (): NodeCache => {
    return new NodeCache(this.configure());
  };

  static {
    this._cache = this.init();
    logger.debug('Cache Time:', this._stdTTL === 0 ? 'UNLIMITED' : `${this._stdTTL / 60} minutes`);
  }
}
