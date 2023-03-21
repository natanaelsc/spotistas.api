import { type Request, type Response } from 'express';
import logger from '../config/logger';
import { type PlaylistService } from '../services/PlaylistService';

export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  getOurPlaylists = async (req: Request, res: Response): Promise<Response> => {
    const { limit } = req.query;
    const limitToNumber = limit == null ? 5 : Number(limit);
    if (Number.isNaN(limitToNumber)) return res.status(400).send({ error: 'limit must be a number' });
    try {
      const playlists = await this.playlistService.getOurPlaylists(limitToNumber);
      res.status(200).json(playlists);
    } catch (error) {
      logger.error(error);
    }
    return res.end();
  };
}
