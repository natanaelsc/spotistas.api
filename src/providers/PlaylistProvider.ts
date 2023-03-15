import { type TrackDto } from './TrackProvider';

export interface PlaylistProvider {
  getPlaylist: (token: string, id: string) => Promise<PlaylistDto>;
}

export interface PlaylistDto {
  id: string;
  name: string;
  description: string;
  images: Array<{ url: string }>;
  followers: { total: number };
  external_urls: { spotify: string };
  tracks: TrackDto[];
}

export interface ItemDto {
  track: TrackDto;
}
