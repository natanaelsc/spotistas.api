import { type Request, type Response } from 'express';
import { type ArtistService } from '../services/ArtistService';

export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  getArtistMonth = async (_req: Request, res: Response): Promise<Response> => {
    const artist = await this.artistService.getArtistMonth();
    return res.status(200).json(artist);
  };
}
