import { type Track } from '../interfaces/models/Track';
import { type ClientAuthProvider } from '../providers/ClientAuthProvider';
import { type PlaylistProvider } from '../providers/PlaylistProvider';

export class TrackService {
  constructor(
    private readonly clientAuthProvider: ClientAuthProvider,
    private readonly playlistProvider: PlaylistProvider
  ) {}

  getTop = async (top = 'brazil', limit = 5): Promise<Track[]> => {
    const token = await this.clientAuthProvider.getAccessToken();
    const playlist = await this.playlistProvider.getPlaylist(token, '37i9dQZF1DX0FOF1IUWK1W');
    const tracks: Track[] = playlist.tracks
      .map(track => ({
        id: track.id,
        name: track.name,
        image: track.album.images[0].url,
        preview_url: track.preview_url,
        external_url: track.external_urls.spotify,
        album: {
          id: track.album.id,
          name: track.album.name,
          image: track.album.images[0].url,
          external_url: track.album.external_urls.spotify,
        },
      }))
      .slice(0, limit);
    return tracks;
  };
}
