import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import config from './config/env';
import routes from './routes';
import morgan from './middlewares/morgan';

const app = express();

const corsOptions = {
  origin: config.node.cors,
  methods: ['GET', 'POST'],
  credentials: true,
};

app.use(morgan);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');

app.use(routes);

export default app;
