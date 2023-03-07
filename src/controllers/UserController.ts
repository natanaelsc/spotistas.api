import { type Request, type Response } from 'express';
import { type UserProvider, type UserProviderDto } from '../providers/UserProvider';

export class UserController {
  constructor(private readonly userProvider: UserProvider) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    const { token } = req.cookies;
    const user: UserProviderDto = await this.userProvider.getUser(token);
    return res.status(200).json({
      id: user.id,
      name: user.display_name,
      email: user.email,
      image: user.images[0].url,
    });
  };
}
