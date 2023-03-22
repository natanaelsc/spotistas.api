import { type ArtistProvider, type ArtistProviderDto, type TrackProviderDto } from '../../interfaces/providers';
import { Spotify } from '../apis/Spotify';
import { HttpClient } from '../http/HttpClient';

export class SpotifyArtistProvider implements ArtistProvider {
  private readonly _path = 'artists';

  getArtist = async (id: string): Promise<ArtistProviderDto> => {
    const token = await Spotify.api();
    const artistProviderDto = await HttpClient.connect(`${this._path}/${id}`, token);
    return artistProviderDto as ArtistProviderDto;
  };

  getArtistTopTracks = async (id: string): Promise<TrackProviderDto[]> => {
    const token = await Spotify.api();
    const trackProviderDto = await HttpClient.connect(`${this._path}/${id}/top-tracks?country=BR`, token);
    return trackProviderDto.tracks as TrackProviderDto[];
  };
}
