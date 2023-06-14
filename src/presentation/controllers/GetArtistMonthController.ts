import { type Request, type Response } from 'express';
import { type MapperDto } from '../../application/mapper/MapperDto';
import { type ArtistProvider } from '../../application/provider/ArtistProvider';
import { type TrackProviderDto } from '../../application/provider/TrackProvider';
import { type ArtistDto } from '../../domain/dto/ArtistDto';
import { type TrackDto } from '../../domain/dto/TrackDto';
import db from '../../infra/database/db.json';
import { Cache } from '../../main/middlewares';
import { ErrorHandler } from '../errors';
import { HttpStatus } from '../http';

export class GetArtistMonthController {
  private readonly db = db.artists;

  constructor(
    private readonly artistProvider: ArtistProvider,
    private readonly trackMapper: MapperDto<TrackDto, TrackProviderDto>
  ) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    const { limit } = req.query;
    const limitToNumber = limit == null ? 5 : Number(limit);
    if (Number.isNaN(limitToNumber))
      return res.status(HttpStatus.BAD_REQUEST).send({ error: 'limit must be a number' });
    try {
      const artistDto = this.db[0] as ArtistDto;
      const trackProviderDtoList = await this.artistProvider.getArtistTopTracks(artistDto.id);
      if (trackProviderDtoList == null) return res.status(HttpStatus.BAD_REQUEST).send({ error: 'bad request' });
      const trackDtoList = this.trackMapper.toDtoList(trackProviderDtoList.slice(0, limitToNumber));
      const artistMonth = {
        ...artistDto,
        tracks: trackDtoList,
      };
      Cache.get(req.originalUrl, artistMonth);
      return res.status(HttpStatus.OK).json(artistMonth);
    } catch (error) {
      const { status, message } = ErrorHandler.catch(error);
      return res.status(status).send({ error: message });
    }
  };
}
