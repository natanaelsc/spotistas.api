import cors from 'cors';
import express from 'express';
import oauthRouter from './routes/oauth';

const app = express();

const corsOptions = {
  origin: undefined,
  methods: ['GET', 'POST'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');

app.use('/oauth', oauthRouter);

export default app;
