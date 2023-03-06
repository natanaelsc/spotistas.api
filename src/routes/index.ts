import { Router } from 'express';
import oauthRouter from './oauth';

const routes = Router();

routes.use('/oauth', oauthRouter);

export default routes;
