import { type MapperDto } from '../../../application/mapper/MapperDto';
import { type UserDto } from '../../../domain/dto/UserDto';
import type User from '../../external/spotify/dto/User';

export class UserMapperDto implements MapperDto<UserDto, User> {
  toDto = (data: User): UserDto => {
    const { id, display_name, email, images, followers, external_urls, country, product } = data;
    return {
      id,
      name: display_name,
      image: images[0].url,
      email,
      followers: followers.total,
      external_url: external_urls.spotify,
      country,
      product,
    };
  };

  toDtoList = (data: User[]): UserDto[] => {
    return data.map(this.toDto);
  };
}
