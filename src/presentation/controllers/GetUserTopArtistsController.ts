import { type Request, type Response } from 'express';
import { type MapperDto } from '../../application/mapper/MapperDto';
import { type ArtistProviderDto } from '../../application/provider/ArtistProvider';
import { type UserProvider } from '../../application/provider/UserProvider';
import { type ArtistDto } from '../../domain/dto/ArtistDto';
import { Cookie } from '../../main/middlewares';
import { ErrorHandler } from '../errors';
import { HttpStatus } from '../http';

export class GetUserTopArtistsController {
  constructor(
    private readonly userProvider: UserProvider,
    private readonly artistMapper: MapperDto<ArtistDto, ArtistProviderDto>
  ) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    const { time, limit } = req.query;
    const limitToNumber = limit == null ? 20 : Number(limit);
    if (Number.isNaN(limitToNumber))
      return res.status(HttpStatus.BAD_REQUEST).send({ error: 'limit must be a number' });
    try {
      const token = Cookie.get(req, 'token');
      const artistProviderDtoList = await this.userProvider.getTopArtists(token, String(time), limitToNumber);
      if (artistProviderDtoList == null) return res.status(HttpStatus.BAD_REQUEST).send({ error: 'bad request' });
      if (artistProviderDtoList.length === 0) return res.status(HttpStatus.OK).send({ message: 'no results found' });
      const artistDtoList = this.artistMapper.toDtoList(artistProviderDtoList);
      return res.status(HttpStatus.OK).json(artistDtoList);
    } catch (error) {
      const { status, message } = ErrorHandler.catch(error);
      return res.status(status).send({ error: message });
    }
  };
}
