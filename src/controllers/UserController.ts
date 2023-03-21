import { type Request, type Response } from 'express';
import { HttpStatus } from '../presentation/http';
import { type UserProvider, type UserProviderDto } from '../providers/UserProvider';
import { Cookie } from './../middlewares';

export class UserController {
  constructor(private readonly userProvider: UserProvider) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    const token = Cookie.get(req, 'token');
    const user: UserProviderDto = await this.userProvider.getUser(token);
    return res.status(HttpStatus.OK).json({
      id: user.id,
      name: user.display_name,
      email: user.email,
      image: user.images[0].url,
    });
  };
}
