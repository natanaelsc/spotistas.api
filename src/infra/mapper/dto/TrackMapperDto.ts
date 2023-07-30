import { type MapperDto } from '../../../application/mapper/MapperDto';
import { type TrackDto } from '../../../domain/dto/TrackDto';
import type Track from '../../external/spotify/dto/Track';

export class TrackMapperDto implements MapperDto<TrackDto, Track> {
  toDto = (data: Track): TrackDto => {
    const { id, name, preview_url, external_urls, duration_ms, popularity, artists, album } = data;
    return {
      id,
      name,
      image: album.images[0].url,
      preview_url,
      external_url: external_urls.spotify,
      duration_ms,
      popularity,
      artists: artists.map(artist => ({
        id: artist.id,
        name: artist.name,
        external_url: artist.external_urls.spotify,
      })),
      album: {
        id: album.id,
        name: album.name,
        image: album.images[0].url,
        release_date: album.release_date,
        external_url: album.external_urls.spotify,
      },
    };
  };

  toDtoList = (data: Track[]): TrackDto[] => {
    return data.map(this.toDto);
  };
}
