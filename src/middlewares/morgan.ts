import morgan, { type StreamOptions } from 'morgan';
import config from '../config/env';
import logger from '../config/logger';

const stream: StreamOptions = {
  write: (message: string) => {
    logger.http(message);
  },
};

const skip = (): boolean => {
  const enviroment = config.node.env;
  return enviroment !== 'development';
};

const morganMiddleware = morgan('dev', {
  stream,
  skip,
});

export default morganMiddleware;
