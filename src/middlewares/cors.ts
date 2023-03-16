import cors, { type CorsOptions } from 'cors';
import config from '../config/env';

const origin = config.node.cors[0].includes('*') ? false : config.node.cors;

const corsOptions: CorsOptions = {
  origin,
  methods: ['GET', 'POST'],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
