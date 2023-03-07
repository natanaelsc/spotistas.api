import { type NextFunction, type Request, type Response } from 'express';
import logger from '../config/logger';
import { SpotifyUserProvider } from '../providers/implementations/SpotifyUserProvider';

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const { token } = req.cookies;
  if (token == null) return res.status(403).send({ message: 'missing token' });
  try {
    const userProvider = new SpotifyUserProvider();
    const user = await userProvider.getUser(token);
    if (user.id == null) return res.status(401).send({ message: 'invalid token' });
  } catch (error) {
    logger.error(error);
    return res.status(429).send({ message: 'rate limits' });
  }
  next();
  return res.status(200);
};

export default authMiddleware;
