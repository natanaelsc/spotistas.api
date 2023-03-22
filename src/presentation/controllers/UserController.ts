import { type Request, type Response } from 'express';
import { Cache, Cookie } from '../../main/middlewares';
import { type UserService } from '../../services/UserService';
import { ErrorHandler } from '../errors';
import { HttpStatus } from '../http';

export class UserController {
  constructor(private readonly userService: UserService) {}

  getUser = async (req: Request, res: Response): Promise<Response> => {
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

  getUserTopTracks = async (req: Request, res: Response): Promise<Response> => {
    const { time, limit } = req.query;
    const limitToNumber = limit == null ? 20 : Number(limit);
    if (Number.isNaN(limitToNumber))
      return res.status(HttpStatus.BAD_REQUEST).send({ error: 'limit must be a number' });
    try {
      const token = Cookie.get(req, 'token');
      const tracks = await this.userService.getUserTopTracks(token, String(time), limitToNumber);
      if (tracks == null) return res.status(HttpStatus.UNAUTHORIZED).send({ error: 'unauthorized' });
      if (tracks.length === 0) return res.status(HttpStatus.OK).send({ message: 'no results found' });
      Cache.get(req.originalUrl, tracks);
      return res.status(HttpStatus.OK).json(tracks);
    } catch (error) {
      const { status, message } = ErrorHandler.catch(error);
      return res.status(status).send({ error: message });
    }
  };
}
