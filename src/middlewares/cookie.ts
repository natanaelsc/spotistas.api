import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import { type CookieOptions } from 'express';
import { Env } from '../config/Env';

const secure = Env.isProduction();

const options: CookieOptions = {
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: 'lax',
  path: '/',
  secure,
  httpOnly: true,
};

const sessionOptions: CookieSessionInterfaces.CookieSessionOptions = {
  name: 'session',
  secret: 'secret',
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: 'lax',
  path: '/',
  secure,
  httpOnly: true,
};

const cookieMiddleware = {
  session: cookieSession(sessionOptions),
  parser: cookieParser(),
  options,
};

export default cookieMiddleware;
