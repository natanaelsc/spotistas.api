import { type MapperDto } from '../../../application/mapper/MapperDto';
import { type ArtistDto } from '../../../domain/dto/ArtistDto';
import { type ArtistProviderDto } from '../../../interfaces/providers';

export class ArtistMapperDto implements MapperDto<ArtistDto, ArtistProviderDto> {
  toDto = (data: ArtistProviderDto): ArtistDto => {
    const { id, name, images, genres, popularity, followers, external_urls } = data;
    return {
      id,
      name,
      image: images[0].url,
      genres,
      popularity,
      followers: followers.total,
      external_url: external_urls.spotify,
    };
  };

  toDtoList = (data: ArtistProviderDto[]): ArtistDto[] => {
    return data.map(item => this.toDto(item));
  };
}
