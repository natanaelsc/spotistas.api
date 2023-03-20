import 'dotenv/config';
import http from 'http';
import app from './app';
import { Env } from './config/Env';
import logger from './config/logger';

const port = Env.getNumber('PORT', 5000);

app.set('port', port);

const server = http.createServer(app);

server
  .listen(port, () => {
    logger.info('🚀 Server is running on port', port);
    logger.info('🚀 Press CTRL-C to stop\n');
  })
  .on('error', err => {
    logger.error(err.message);
  });
