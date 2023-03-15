import { type ItemDto, type PlaylistDto, type PlaylistProvider } from '../PlaylistProvider';

export class SpotifyPlaylistProvider implements PlaylistProvider {
  getPlaylist = async (token: string, id: string): Promise<PlaylistDto> => {
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
      tracks: data.tracks.items.map((item: ItemDto) => ({
        id: item.track.id,
        name: item.track.name,
        preview_url: item.track.preview_url,
        external_urls: item.track.external_urls,
        album: {
          id: item.track.album.id,
          name: item.track.album.name,
          images: item.track.album.images,
          external_urls: item.track.album.external_urls,
        },
      })),
    };
    return playlist as PlaylistDto;
  };
}
