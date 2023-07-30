import { type MapperDto } from '../../../application/mapper/MapperDto';
import { type PlaylistDto } from '../../../domain/dto/PlaylistDto';
import type Playlist from '../../external/spotify/dto/Playlist';

export class PlaylistMapperDto implements MapperDto<PlaylistDto, Playlist> {
  toDto = (data: Playlist): PlaylistDto => {
    const { id, name, description, images, followers, external_urls } = data;
    return {
      id,
      name,
      image: images[0].url,
      description,
      followers: followers?.total,
      external_url: external_urls.spotify,
    };
  };

  toDtoList = (data: Playlist[]): PlaylistDto[] => {
    return data.map(this.toDto);
  };
}
