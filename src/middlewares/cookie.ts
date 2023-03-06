import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import config from '../config/env';

const cookieSessionOptions = {
  name: 'session',
  secret: 'secret',
  maxAge: 24 * 60 * 60 * 1000,
  SameSite: 'lax',
  path: '/',
  secure: config.node.env === 'development',
  httpOnly: true,
};

const cookieMiddleware = {
  session: cookieSession(cookieSessionOptions),
  parser: cookieParser(),
};

export default cookieMiddleware;
