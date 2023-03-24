import { type Request, type Response } from 'express';
import { Cache } from '../../main/middlewares';
import { type ArtistService } from '../../services/ArtistService';
import { ErrorHandler } from '../errors';
import { HttpStatus } from '../http';

export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  getArtistMonth = async (req: Request, res: Response): Promise<Response> => {
    const { limit } = req.query;
    const limitToNumber = limit == null ? 5 : Number(limit);
    if (Number.isNaN(limitToNumber))
      return res.status(HttpStatus.BAD_REQUEST).send({ error: 'limit must be a number' });
    try {
      const artistMonth = await this.artistService.getArtistMonth(limitToNumber);
      if (artistMonth == null) return res.status(HttpStatus.UNAUTHORIZED).send({ error: 'unauthorized' });
      Cache.get(req.originalUrl, artistMonth);
      return res.status(HttpStatus.OK).json(artistMonth);
    } catch (error) {
      const { status, message } = ErrorHandler.catch(error);
      return res.status(status).send({ error: message });
    }
  };
}
