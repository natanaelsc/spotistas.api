/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { type Express } from 'express';
import http from 'http';
import { HttpStatus } from '../presentation/http';
import { Env } from './config/Env';
import logger from './config/logger';
import { Cookie, Cors, Morgan } from './middlewares';

export default class Server {
  private readonly _app: Express;
  private readonly server: http.Server;
  private readonly _port = Env.getNumber('PORT', 5000);

  public get app(): Express {
    return this._app;
  }

  public get address(): string {
    return this.server.address() as string;
  }

  public get port(): number {
    return this._port;
  }

  constructor() {
    this._app = express();
    this._app.set('port', this._port);
    this.server = http.createServer(this._app);
    this.healthCheck();
    this.configure();
  }

  private readonly configure = (): void => {
    this._app.disable('x-powered-by');
    this._app.use(Morgan.middleware);
    this._app.use(Cors.middleware);
    this._app.use(Cookie.middleware.parser);
    this._app.use(Cookie.middleware.session);
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
  };

  public use = (...args: any[]): void => {
    this._app.use(...args);
  };

  public readonly start = (): void => {
    this.server
      .listen(this._port, () => {
        logger.info('🚀 Server is running on port', this._port);
        logger.info('🚀 Press CTRL-C to stop\n');
      })
      .on('error', err => {
        logger.error(err);
        process.exit(1);
      });
  };

  private readonly healthCheck = (): void => {
    this._app.get('/healthcheck', (_req, res, _next) => {
      const healthCheck = {
        uptime: process.uptime(),
        reponse_time: process.hrtime(),
        message: 'OK',
        timestamp: Date.now(),
      };
      try {
        res.status(HttpStatus.OK).send(healthCheck);
      } catch (error) {
        healthCheck.message = error as string;
        res.status(503).send();
      }
      logger.debug(healthCheck);
    });
  };
}
