import { ArtistMapperDto } from '../mapper/dto/ArtistMapperDto';
import { PlaylistMapperDto } from '../mapper/dto/PlaylistMapperDto';
import { TrackMapperDto } from '../mapper/dto/TrackMapperDto';
import { UserMapperDto } from '../mapper/dto/UserMapperDto';

export class MapperFactory {
  createArtistMapper = (): ArtistMapperDto => {
    return new ArtistMapperDto();
  };

  createTrackMapper = (): TrackMapperDto => {
    return new TrackMapperDto();
  };

  createUserMapper = (): UserMapperDto => {
    return new UserMapperDto();
  };

  createPlaylistMapper = (): PlaylistMapperDto => {
    return new PlaylistMapperDto();
  };
}
