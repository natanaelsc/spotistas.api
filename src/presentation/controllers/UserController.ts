import { type Request, type Response } from 'express';
import { type UserProvider } from '../../interfaces/providers';
import { Cookie } from '../../main/middlewares';
import { HttpStatus } from '../http';

export class UserController {
  constructor(private readonly userProvider: UserProvider) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    const token = Cookie.get(req, 'token');
    const user = await this.userProvider.getUser(token);
    return res.status(HttpStatus.OK).json({
      id: user.id,
      name: user.display_name,
      email: user.email,
      image: user.images[0].url,
    });
  };
}
