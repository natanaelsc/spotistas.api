import { type TrackProviderDto } from './TrackProvider';

export interface PlaylistProvider {
  getPlaylist: (token: string, id: string) => Promise<PlaylistProviderDto>;
}

export interface PlaylistProviderDto {
  id: string;
  name: string;
  description: string;
  images: Array<{ url: string }>;
  followers: { total: number };
  external_urls: { spotify: string };
  tracks: TrackProviderDto[];
}

export interface ItemProviderDto {
  track: TrackProviderDto;
}
