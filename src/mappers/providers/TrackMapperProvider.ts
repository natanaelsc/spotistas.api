import { type MapperProvider } from '../../interfaces/mappers/MapperProvider';
import { type Track } from '../../interfaces/models/Track';
import { type TrackProviderDto } from '../../providers/TrackProvider';

export class TrackMapperProvider implements MapperProvider<Track, TrackProviderDto> {
  toModel = (data: TrackProviderDto): Track => {
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

  toModelList = (data: TrackProviderDto[]): Track[] => {
    return data.map(this.toModel);
  };
}
