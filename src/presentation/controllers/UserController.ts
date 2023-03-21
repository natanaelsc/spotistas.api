import { type Request, type Response } from 'express';
import { type UserProvider } from '../../interfaces/providers';
import { Cache, Cookie } from '../../main/middlewares';
import { ErrorHandler } from '../errors';
import { HttpStatus } from '../http';

export class UserController {
  constructor(private readonly userProvider: UserProvider) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const token = Cookie.get(req, 'token');
      const user = await this.userProvider.getUser(token);
      if (user == null) return res.status(HttpStatus.UNAUTHORIZED).send({ error: 'unauthorized' });
      Cache.get(req.originalUrl, user);
      return res.status(HttpStatus.OK).json({
        id: user.id,
        name: user.display_name,
        email: user.email,
        image: user.images[0].url,
      });
    } catch (error) {
      const { status, message } = ErrorHandler.catch(error);
      return res.status(status).send({ error: message });
    }
  };
}
