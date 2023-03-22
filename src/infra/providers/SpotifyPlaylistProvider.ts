import { type PlaylistProvider, type PlaylistProviderDto } from '../../interfaces/providers';
import { Env } from '../../main/config';
import { Spotify } from '../apis/Spotify';
import { HttpClient } from '../http/HttpClient';

export class SpotifyPlaylistProvider implements PlaylistProvider {
  private readonly _path = 'playlists';
  private readonly userId = Env.get('SPOTIFY_USER_ID');

  getPlaylist = async (id: string): Promise<PlaylistProviderDto> => {
    const token = await Spotify.api();
    const playlistProviderDto = await HttpClient.connect(`${this._path}/${id}`, token);
    return playlistProviderDto as PlaylistProviderDto;
  };

  getOurPlaylists = async (): Promise<PlaylistProviderDto[]> => {
    const token = await Spotify.api();
    const response = await HttpClient.connect(`https://api.spotify.com/v1/users/${this.userId}/playlists`, token);
    const playlists = response.items.map((playlist: PlaylistProviderDto) => ({
      id: playlist.id,
      name: playlist.name,
      description: playlist.description,
      images: playlist.images,
      followers: playlist.followers,
      external_urls: playlist.external_urls,
    }));
    return playlists as PlaylistProviderDto[];
  };
}
