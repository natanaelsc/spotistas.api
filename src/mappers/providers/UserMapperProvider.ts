import { type MapperProvider } from '../../interfaces/mappers/MapperProvider';
import { type User } from '../../interfaces/models/User';
import { type UserProviderDto } from '../../interfaces/providers';

export class UserMapperProvider implements MapperProvider<User, UserProviderDto> {
  toModel = (dto: UserProviderDto): User => {
    const { id, display_name, email, images, followers, external_urls, country, product } = dto;
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

  toModelList = (dtos: UserProviderDto[]): User[] => {
    return dtos.map(dto => this.toModel(dto));
  };
}
