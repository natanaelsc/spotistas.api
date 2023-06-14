import { type MapperDto } from '../../../application/mapper/MapperDto';
import { type PlaylistProviderDto } from '../../../application/provider/PlaylistProvider';
import { type PlaylistDto } from '../../../domain/dto/PlaylistDto';

export class PlaylistMapperDto implements MapperDto<PlaylistDto, PlaylistProviderDto> {
  toDto = (data: PlaylistProviderDto): PlaylistDto => {
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

  toDtoList = (data: PlaylistProviderDto[]): PlaylistDto[] => {
    return data.map(this.toDto);
  };
}
