import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import config from '../config/env';

const options = {
  maxAge: 24 * 60 * 60 * 1000,
  SameSite: 'lax',
  secure: true,
  httpOnly: true,
};

const sessionOptions = {
  name: 'session',
  secret: 'secret',
  maxAge: 24 * 60 * 60 * 1000,
  SameSite: 'lax',
  path: '/',
  secure: config.node.env === 'development',
  httpOnly: true,
};

const cookieMiddleware = {
  session: cookieSession(sessionOptions),
  parser: cookieParser(),
  sessionOptions,
  options,
};

export default cookieMiddleware;
