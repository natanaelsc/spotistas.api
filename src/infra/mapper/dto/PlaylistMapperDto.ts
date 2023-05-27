import { type MapperDto } from '../../../application/mapper/MapperDto';
import { type PlaylistDto } from '../../../domain/dto/PlaylistDto';
import { type PlaylistProviderDto } from '../../../interfaces/providers';
import { TrackMapperDto } from './TrackMapperDto';

export class PlaylistMapperDto implements MapperDto<PlaylistDto, PlaylistProviderDto> {
  private readonly trackMapper: TrackMapperDto;

  constructor() {
    this.trackMapper = new TrackMapperDto();
  }

  toDto = (data: PlaylistProviderDto): PlaylistDto => {
    const { id, name, description, images, followers, external_urls, tracks } = data;
    const { items } = tracks;
    return {
      id,
      name,
      image: images[0].url,
      description,
      followers: followers?.total,
      external_url: external_urls.spotify,
      tracks: items.map(item => this.trackMapper.toDto(item.track)),
    };
  };

  toDtoList = (data: PlaylistProviderDto[]): PlaylistDto[] => {
    return data.map(this.toDto);
  };
}
