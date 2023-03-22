import { type MapperProvider } from '../../interfaces/mappers/MapperProvider';
import { type Playlist } from '../../interfaces/models/Playlist';
import { type PlaylistProviderDto } from '../../interfaces/providers';
import { TrackMapperProvider } from './TrackMapperProvider';

export class PlaylistMapperProvider implements MapperProvider<Playlist, PlaylistProviderDto> {
  private readonly trackMapperProvider: TrackMapperProvider;

  constructor() {
    this.trackMapperProvider = new TrackMapperProvider();
  }

  toModel = (data: PlaylistProviderDto): Playlist => {
    const { id, name, description, images, followers, external_urls, tracks } = data;
    const { items } = tracks;
    return {
      id,
      name,
      image: images[0].url,
      description,
      followers: followers?.total,
      external_url: external_urls.spotify,
      tracks: items.map(item => this.trackMapperProvider.toModel(item.track)),
    };
  };

  toModelList = (data: PlaylistProviderDto[]): Playlist[] => {
    return data.map(this.toModel);
  };
}
