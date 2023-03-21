import morgan, { type StreamOptions } from 'morgan';
import { Env } from '../config';
import logger from '../config/logger';

export class Morgan {
  private static readonly _format = Env.get('MORGAN', 'dev');

  private static readonly stream: StreamOptions = {
    write: (message: string) => {
      logger.http(message);
    },
  };

  private static readonly skip = (): boolean => {
    return Env.isProduction();
  };

  public static readonly middleware = morgan(this._format, {
    stream: this.stream,
    skip: this.skip,
  });

  static {
    logger.debug('Morgan:', this.skip() ? 'DISABLED' : 'ENABLED');
  }
}
