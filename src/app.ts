import cors from 'cors';
import express from 'express';

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

export default app;
