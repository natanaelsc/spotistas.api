import { type Request, type Response } from 'express';
import { Cache } from '../../main/middlewares';
import { type TrackService } from '../../services/TrackService';
import { ErrorHandler } from '../errors';
import { HttpStatus } from '../http';

export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  getTrack = async (req: Request, res: Response): Promise<Response> => {
    const { top, limit } = req.query;
    const limitToNumber = limit == null ? 5 : Number(limit);
    const topToString = top == null ? 'br' : String(top);
    if (Number.isNaN(limitToNumber))
      return res.status(HttpStatus.BAD_REQUEST).send({ error: 'limit must be a number' });
    try {
      const tracks = await this.trackService.getTop(topToString, limitToNumber);
      if (tracks == null) return res.status(HttpStatus.UNAUTHORIZED).send({ error: 'unauthorized' });
      Cache.get(req.originalUrl, tracks);
      return res.status(HttpStatus.OK).json(tracks);
    } catch (error) {
      const { status, message } = ErrorHandler.catch(error);
      return res.status(status).send({ error: message });
    }
  };

  getTrackOfTheDay = async (req: Request, res: Response): Promise<Response> => {
    try {
      const track = await this.trackService.getTrackOfTheDay();
      if (track == null) return res.status(HttpStatus.UNAUTHORIZED).send({ error: 'unauthorized' });
      Cache.get(req.originalUrl, track);
      return res.status(HttpStatus.OK).json(track);
    } catch (error) {
      const { status, message } = ErrorHandler.catch(error);
      return res.status(status).send({ error: message });
    }
  };
}
