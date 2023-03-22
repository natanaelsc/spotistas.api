import { type PlaylistProvider, type PlaylistProviderDto } from '../../interfaces/providers';
import { Env } from '../../main/config';

export class SpotifyPlaylistProvider implements PlaylistProvider {
  private readonly userId = Env.get('SPOTIFY_USER_ID');

  getPlaylist = async (token: string, id: string): Promise<PlaylistProviderDto> => {
    const response: Response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const playlist = await response.json();
    return playlist as PlaylistProviderDto;
  };

  getOurPlaylists = async (token: string): Promise<PlaylistProviderDto[]> => {
    const response: Response = await fetch(`https://api.spotify.com/v1/users/${this.userId}/playlists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
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
