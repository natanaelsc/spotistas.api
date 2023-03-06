import express from 'express';
import cookie from './middlewares/cookie';
import cors from './middlewares/cors';
import morgan from './middlewares/morgan';
import routes from './routes';

const app = express();

app.use(morgan);
app.use(cors);
app.use(cookie.parser);
app.use(cookie.session);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');

app.use(routes);

export default app;
