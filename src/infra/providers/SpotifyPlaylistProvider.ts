import { type PlaylistProvider, type PlaylistProviderDto } from '../../application/provider/PlaylistProvider';
import { Env } from '../../main/config';
import { Spotify } from '../api/Spotify';

export class SpotifyPlaylistProvider implements PlaylistProvider {
  private readonly path = 'playlists';
  private readonly userId = Env.get('SPOTIFY_USER_ID');

  getPlaylist = async (id: string): Promise<PlaylistProviderDto> => {
    const playlistProviderDto = await Spotify.api(`${this.path}/${id}`);
    return playlistProviderDto as PlaylistProviderDto;
  };

  getOurPlaylists = async (): Promise<PlaylistProviderDto[]> => {
    const data = await Spotify.api(`users/${this.userId}/playlists`);
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
