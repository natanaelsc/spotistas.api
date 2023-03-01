import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import env from './config/env';
import oauthRouter from './routes/oauth';

const app = express();

const corsOptions = {
  origin: env.node.cors,
  methods: ['GET', 'POST'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');

app.use('/oauth', oauthRouter);

export default app;
