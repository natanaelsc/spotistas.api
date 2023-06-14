import { type Request, type Response } from 'express';
import { type MapperDto } from '../../application/mapper/MapperDto';
import { type PlaylistProvider } from '../../application/provider/PlaylistProvider';
import { type TrackProviderDto } from '../../application/provider/TrackProvider';
import { type TrackDto } from '../../domain/dto/TrackDto';
import db from '../../infra/database/db.json';
import { Cache } from '../../main/middlewares';
import { ErrorHandler } from '../errors';
import { HttpStatus } from '../http';

export class GetTopMusicBrasilController {
  private readonly db = db;

  constructor(
    private readonly playlistProvider: PlaylistProvider,
    private readonly trackMapper: MapperDto<TrackDto, TrackProviderDto>
  ) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    const { limit } = req.query;
    const limitToNumber = limit == null ? 5 : Number(limit);
    if (Number.isNaN(limitToNumber))
      return res.status(HttpStatus.BAD_REQUEST).send({ error: 'limit must be a number' });
    try {
      const playlistId = this.db.playlists[0].id;
      const playlistProviderDto = await this.playlistProvider.getPlaylist(playlistId);
      if (playlistProviderDto == null) return res.status(HttpStatus.BAD_REQUEST).send({ error: 'bad request' });
      const trackProviderDtoList = playlistProviderDto.tracks.items.map(item => item.track);
      const trackDtoList = this.trackMapper.toDtoList(trackProviderDtoList.slice(0, limitToNumber));
      const tracks = { tracks: trackDtoList };
      Cache.get(req.originalUrl, tracks);
      return res.status(HttpStatus.OK).json(tracks);
    } catch (error) {
      const { status, message } = ErrorHandler.catch(error);
      return res.status(status).send({ error: message });
    }
  };
}
