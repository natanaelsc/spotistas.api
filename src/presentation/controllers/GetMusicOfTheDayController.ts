import { type Request, type Response } from 'express';
import { type MapperDto } from '../../application/mapper/MapperDto';
import type ArtistProvider from '../../application/provider/ArtistProvider';
import type TrackProvider from '../../application/provider/TrackProvider';
import { type MusicOfTheDay, type TrackDto } from '../../domain/dto/TrackDto';
import db from '../../infra/database/db.json';
import type Track from '../../infra/external/spotify/dto/Track';
import { Cache } from '../../main/middlewares';
import { ErrorHandler } from '../errors';
import { HttpStatus } from '../http';

export class GetMusicOfTheDayController {
  private readonly db = db;

  constructor(
    private readonly trackProvider: TrackProvider,
    private readonly artistProvider: ArtistProvider,
    private readonly trackMapper: MapperDto<TrackDto, Track>
  ) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const music = this.db.tracks[0];
      const trackProviderDto = await this.trackProvider.getTrack(music.id);
      if (trackProviderDto == null) return res.status(HttpStatus.BAD_REQUEST).send({ error: 'bad request' });
      const trackDto = this.trackMapper.toDto(trackProviderDto);
      let musicOfTheDay: MusicOfTheDay;
      if (trackDto.artists == null) {
        musicOfTheDay = {
          ...trackDto,
          note: music.note,
        };
        return res.status(HttpStatus.OK).json(musicOfTheDay);
      }
      const artistId = trackDto.artists[0].id;
      const artistProviderDto = await this.artistProvider.getArtist(artistId);
      musicOfTheDay = {
        ...trackDto,
        artists: [
          {
            id: artistProviderDto.id,
            name: artistProviderDto.name,
            image: artistProviderDto.images[0].url,
            genres: artistProviderDto.genres,
            popularity: artistProviderDto.popularity,
            external_url: artistProviderDto.external_urls.spotify,
          },
        ],
        note: music.note,
      };
      Cache.get(req.originalUrl, musicOfTheDay);
      return res.status(HttpStatus.OK).json(musicOfTheDay);
    } catch (error) {
      const { status, message } = ErrorHandler.catch(error);
      return res.status(status).send({ error: message });
    }
  };
}
