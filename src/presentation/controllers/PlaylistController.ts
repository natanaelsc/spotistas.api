import { type Request, type Response } from 'express';
import logger from '../../main/config/logger';
import { type PlaylistService } from '../../services/PlaylistService';
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
      res.status(HttpStatus.OK).json(playlists);
    } catch (error) {
      logger.error(error);
    }
    return res.end();
  };
}
