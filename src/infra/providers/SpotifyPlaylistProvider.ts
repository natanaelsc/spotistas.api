import { type ItemProviderDto, type PlaylistProvider, type PlaylistProviderDto } from '../../interfaces/providers';
import { Env } from '../../main/config';

export class SpotifyPlaylistProvider implements PlaylistProvider {
  private readonly userId = Env.get('SPOTIFY_USER_ID');

  getPlaylist = async (token: string, id: string): Promise<PlaylistProviderDto> => {
    const response: Response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const playlist = {
      id: data.id,
      name: data.name,
      description: data.description,
      images: data.images,
      followers: data.followers,
      external_urls: data.external_urls,
      tracks: data.tracks.items.map((item: ItemProviderDto) => ({
        id: item.track.id,
        name: item.track.name,
        preview_url: item.track.preview_url,
        external_urls: item.track.external_urls,
        duration_ms: item.track.duration_ms,
        popularity: item.track.popularity,
        artists: item.track.artists.map(artist => ({
          id: artist.id,
          name: artist.name,
          genres: artist.genres,
          popularity: artist.popularity,
          external_urls: artist.external_urls,
        })),
        album: {
          id: item.track.album.id,
          name: item.track.album.name,
          images: item.track.album.images,
          external_urls: item.track.album.external_urls,
        },
      })),
    };
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
