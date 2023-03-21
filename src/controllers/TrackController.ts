import { type Request, type Response } from 'express';
import logger from '../config/logger';
import { type TrackService } from '../services/TrackService';

export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  getTrack = async (req: Request, res: Response): Promise<Response> => {
    const { top, limit } = req.query;
    const limitToNumber = limit == null ? 5 : Number(limit);
    const topToString = top == null ? 'br' : String(top);
    if (Number.isNaN(limitToNumber)) return res.status(400).send({ message: 'limit must be a number' });
    const tracks = await this.trackService.getTop(topToString, limitToNumber);
    return res.status(200).json(tracks);
  };

  getTrackOfTheDay = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const track = await this.trackService.getTrackOfTheDay();
      return res.status(200).json(track);
    } catch (error) {
      logger.error(error);
      return res.end();
    }
  };
}
