import cors, { type CorsOptions } from 'cors';
import { Env } from '../config/Env';

const origin = Env.getList('CORS')[0].includes('*') ? false : Env.getList('CORS') ?? true;

const corsOptions: CorsOptions = {
  origin,
  methods: ['GET', 'POST'],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
