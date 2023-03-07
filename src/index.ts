import http from 'http';
import app from './app';
import config from './config/env';
import logger from './config/logger';

const { node, spotify } = config;

app.set('port', node.port);

const server = http.createServer(app);

try {
  server
    .listen(node.port, () => {
      logger.info('Environment variables loaded');
      logger.debug('PORT: ', node.port);
      logger.debug('CORS: ', node.cors);
      logger.debug('Client ID: ', spotify.client_id);
      logger.debug('Client Secret: ', spotify.client_secret);
      logger.debug('Redirect URI: ', spotify.redirect_uri);
      logger.debug('Scope: ', spotify.scope);
      logger.info(`Server is running on port ${node.port}`);
    })
    .on('error', err => {
      logger.error(err.message);
    });
} catch (err) {
  logger.error("Couldn't start server. Set environment variables.");
}
