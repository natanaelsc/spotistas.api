/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { type Express } from 'express';
import http from 'http';
import { Env } from './config/Env';
import logger from './config/logger';
import { Cors } from './middlewares/Cors';
import cookieMiddleware from './middlewares/cookie';
import morganMiddleware from './middlewares/morgan';
import routes from './routes';

export default class Server {
  private readonly _app: Express;
  private readonly _server: http.Server;
  private readonly _port = Env.getNumber('PORT', 5000);

  public get app(): Express {
    return this._app;
  }

  public get server(): http.Server {
    return this._server;
  }

  constructor() {
    this._app = express();
    this._app.set('port', this._port);
    this._server = http.createServer(this._app);
    this.configure();
  }

  private readonly configure = (): void => {
    this._app.use(morganMiddleware);
    this._app.use(Cors.middleware);
    this._app.use(cookieMiddleware.parser);
    this._app.use(cookieMiddleware.session);
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
    this._app.use(routes);
    this._app.disable('x-powered-by');
  };

  public use = (...args: any[]): void => {
    this._app.use(...args);
  };

  public start = (): void => {
    const port = this._app.get('port');
    this._server
      .listen(port, () => {
        logger.info('🚀 Server is running on port', port);
        logger.info('🚀 Press CTRL-C to stop\n');
      })
      .on('error', err => {
        logger.error(err);
        process.exit(1);
      });
  };
}
