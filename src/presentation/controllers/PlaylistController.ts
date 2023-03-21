import { type Request, type Response } from 'express';
import { Cache } from '../../main/middlewares';
import { type PlaylistService } from '../../services/PlaylistService';
import { ErrorHandler } from '../errors';
import { HttpStatus } from '../http';

export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  getOurPlaylists = async (req: Request, res: Response): Promise<Response> => {
    const { limit } = req.query;
    const limitToNumber = limit == null ? 5 : Number(limit);
    if (Number.isNaN(limitToNumber))
      return res.status(HttpStatus.BAD_REQUEST).send({ error: 'limit must be a number' });
    try {
      const playlists = await this.playlistService.getOurPlaylists(limitToNumber);
      if (playlists == null) return res.status(HttpStatus.UNAUTHORIZED).send({ error: 'unauthorized' });
      Cache.get(req.originalUrl, playlists);
      res.status(HttpStatus.OK).json(playlists);
    } catch (error) {
      const { status, message } = ErrorHandler.catch(error);
      return res.status(status).send({ error: message });
    }
    return res.end();
  };
}
