import { type MapperProvider } from '../../interfaces/mappers/MapperProvider';
import { type Artist } from '../../interfaces/models/Artist';
import { type ArtistProviderDto } from '../../interfaces/providers';

export class ArtistMapperProvider implements MapperProvider<Artist, ArtistProviderDto> {
  toModel = (data: ArtistProviderDto): Artist => {
    return {
      id: data.id,
      name: data.name,
      image: data.images[0].url,
      genres: data.genres,
      popularity: data.popularity,
      followers: data.followers.total,
      external_url: data.external_urls.spotify,
    };
  };

  toModelList = (data: ArtistProviderDto[]): Artist[] => {
    return data.map(item => this.toModel(item));
  };
}
