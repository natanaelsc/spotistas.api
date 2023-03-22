import { type Request, type Response } from 'express';
import { Cache, Cookie } from '../../main/middlewares';
import { type UserService } from '../../services/UserService';
import { ErrorHandler } from '../errors';
import { HttpStatus } from '../http';

export class UserController {
  constructor(private readonly userService: UserService) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const token = Cookie.get(req, 'token');
      const user = await this.userService.getUser(token);
      if (user == null) return res.status(HttpStatus.UNAUTHORIZED).send({ error: 'unauthorized' });
      Cache.get(req.originalUrl, user);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      const { status, message } = ErrorHandler.catch(error);
      return res.status(status).send({ error: message });
    }
  };
}
