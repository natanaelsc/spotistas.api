import cors, { type CorsOptions } from 'cors';
import config from '../config/env';

const corsOptions: CorsOptions = {
  origin: config.node.cors,
  methods: ['GET', 'POST'],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
