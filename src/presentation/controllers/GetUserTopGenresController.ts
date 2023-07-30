import { type Request, type Response } from 'express';
import type UserProvider from '../../application/provider/UserProvider';
import { Cookie } from '../../main/middlewares';
import { ErrorHandler } from '../errors';
import { HttpStatus } from '../http';

export class GetUserTopGenresController {
  constructor(private readonly userProvider: UserProvider) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    const { time, limit } = req.query;
    const limitToNumber = limit == null ? 20 : Number(limit);
    if (Number.isNaN(limitToNumber))
      return res.status(HttpStatus.BAD_REQUEST).send({ error: 'limit must be a number' });
    try {
      const token = Cookie.get(req, 'token');
      const artistProviderDtoList = await this.userProvider.getTopArtists(token, String(time));
      if (artistProviderDtoList == null) return res.status(HttpStatus.BAD_REQUEST).send({ error: 'bad request' });
      if (artistProviderDtoList.length === 0) return res.status(HttpStatus.OK).send({ message: 'no results found' });
      const genres = artistProviderDtoList.flatMap(artist => artist.genres);
      const uniqueGenres = [...new Set(genres)];
      return res.status(HttpStatus.OK).json(uniqueGenres.slice(0, limitToNumber));
    } catch (error) {
      const { status, message } = ErrorHandler.catch(error);
      return res.status(status).send({ error: message });
    }
  };
}
