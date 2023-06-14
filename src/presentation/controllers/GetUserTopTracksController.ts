import { type Request, type Response } from 'express';
import { type MapperDto } from '../../application/mapper/MapperDto';
import { type TrackProviderDto } from '../../application/provider/TrackProvider';
import { type UserProvider } from '../../application/provider/UserProvider';
import { type TrackDto } from '../../domain/dto/TrackDto';
import { Cookie } from '../../main/middlewares';
import { ErrorHandler } from '../errors';
import { HttpStatus } from '../http';

export class GetUserTopTracksController {
  constructor(
    private readonly userProvider: UserProvider,
    private readonly trackMapper: MapperDto<TrackDto, TrackProviderDto>
  ) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    const { time, limit } = req.query;
    const limitToNumber = limit == null ? 20 : Number(limit);
    if (Number.isNaN(limitToNumber))
      return res.status(HttpStatus.BAD_REQUEST).send({ error: 'limit must be a number' });
    try {
      const token = Cookie.get(req, 'token');
      const trackProviderDtoList = await this.userProvider.getTopTracks(token, String(time), limitToNumber);
      if (trackProviderDtoList == null) return res.status(HttpStatus.BAD_REQUEST).send({ error: 'bad request' });
      if (trackProviderDtoList.length === 0) return res.status(HttpStatus.OK).send({ message: 'no results found' });
      const trackDtoList = this.trackMapper.toDtoList(trackProviderDtoList);
      const tracks = { tracks: trackDtoList };
      return res.status(HttpStatus.OK).json(tracks);
    } catch (error) {
      const { status, message } = ErrorHandler.catch(error);
      return res.status(status).send({ error: message });
    }
  };
}
