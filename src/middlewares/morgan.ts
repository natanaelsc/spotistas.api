import morgan, { type StreamOptions } from 'morgan';
import { Env } from '../config/Env';
import logger from '../config/logger';

const stream: StreamOptions = {
  write: (message: string) => {
    logger.http(message);
  },
};

const skip = (): boolean => {
  return Env.isProduction();
};

const morganMiddleware = morgan('dev', {
  stream,
  skip,
});

export default morganMiddleware;
