import { type Request, type Response } from 'express';
import { type MapperDto } from '../../application/mapper/MapperDto';
import type PlaylistProvider from '../../application/provider/PlaylistProvider';
import { type PlaylistDto } from '../../domain/dto/PlaylistDto';
import type Playlist from '../../infra/external/spotify/dto/Playlist';
import { Cache } from '../../main/middlewares';
import { ErrorHandler } from '../errors';
import { HttpStatus } from '../http';

export class GetOurPlaylistsController {
  constructor(
    private readonly playlistProvider: PlaylistProvider,
    private readonly playlistMapper: MapperDto<PlaylistDto, Playlist>
  ) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    const { limit } = req.query;
    const limitToNumber = limit == null ? 5 : Number(limit);
    if (Number.isNaN(limitToNumber))
      return res.status(HttpStatus.BAD_REQUEST).send({ error: 'limit must be a number' });
    try {
      const playlistProviderDtoList = await this.playlistProvider.getOurPlaylists(limitToNumber);
      if (playlistProviderDtoList == null) return res.status(HttpStatus.ACCEPTED).send({ message: 'no results found' });
      const playlistDtoList = this.playlistMapper.toDtoList(playlistProviderDtoList);
      Cache.get(req.originalUrl, playlistDtoList);
      res.status(HttpStatus.OK).json(playlistDtoList);
    } catch (error) {
      const { status, message } = ErrorHandler.catch(error);
      return res.status(status).send({ error: message });
    }
    return res.end();
  };
}
