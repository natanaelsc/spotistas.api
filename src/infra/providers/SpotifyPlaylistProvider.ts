import { type PlaylistProvider, type PlaylistProviderDto } from '../../application/provider/PlaylistProvider';
import { Env } from '../../main/config';
import { Spotify } from '../api/Spotify';

export class SpotifyPlaylistProvider implements PlaylistProvider {
  private readonly path = 'playlists';
  private readonly limit = 50;
  private readonly userId = Env.get('SPOTIFY_USER_ID');

  getPlaylist = async (id: string): Promise<PlaylistProviderDto> => {
    const playlistProviderDto = await Spotify.api(`${this.path}/${id}`);
    return playlistProviderDto as PlaylistProviderDto;
  };

  getOurPlaylists = async (limit = this.limit): Promise<PlaylistProviderDto[]> => {
    const data = await Spotify.api(`users/${this.userId}/playlists?limit=${limit}`);
    const playlists = data.items.map((playlist: PlaylistProviderDto) => ({
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
