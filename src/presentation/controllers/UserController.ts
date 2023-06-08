import { type Request, type Response } from 'express';
import { Cookie } from '../../main/middlewares';
import { type UserService } from '../../services/UserService';
import { ErrorHandler } from '../errors';
import { HttpStatus } from '../http';

export class UserController {
  constructor(private readonly userService: UserService) {}

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
      return res.status(HttpStatus.OK).json(tracks);
    } catch (error) {
      const { status, message } = ErrorHandler.catch(error);
      return res.status(status).send({ error: message });
    }
  };

  getUserTopArtists = async (req: Request, res: Response): Promise<Response> => {
    const { time, limit } = req.query;
    const limitToNumber = limit == null ? 20 : Number(limit);
    if (Number.isNaN(limitToNumber))
      return res.status(HttpStatus.BAD_REQUEST).send({ error: 'limit must be a number' });
    try {
      const token = Cookie.get(req, 'token');
      const artists = await this.userService.getUserTopArtists(token, String(time), limitToNumber);
      if (artists == null) return res.status(HttpStatus.UNAUTHORIZED).send({ error: 'unauthorized' });
      if (artists.length === 0) return res.status(HttpStatus.OK).send({ message: 'no results found' });
      return res.status(HttpStatus.OK).json(artists);
    } catch (error) {
      const { status, message } = ErrorHandler.catch(error);
      return res.status(status).send({ error: message });
    }
  };

  getUserTopGenres = async (req: Request, res: Response): Promise<Response> => {
    const { time, limit } = req.query;
    const limitToNumber = limit == null ? 20 : Number(limit);
    if (Number.isNaN(limitToNumber))
      return res.status(HttpStatus.BAD_REQUEST).send({ error: 'limit must be a number' });
    try {
      const token = Cookie.get(req, 'token');
      const genres = await this.userService.getUserTopGenres(token, String(time), limitToNumber);
      if (genres == null) return res.status(HttpStatus.UNAUTHORIZED).send({ error: 'unauthorized' });
      if (genres.length === 0) return res.status(HttpStatus.OK).send({ message: 'no results found' });
      return res.status(HttpStatus.OK).json(genres);
    } catch (error) {
      const { status, message } = ErrorHandler.catch(error);
      return res.status(status).send({ error: message });
    }
  };
}
