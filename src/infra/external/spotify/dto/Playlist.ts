import type Track from './Track';

export default interface Playlist {
  id: string;
  name: string;
  description: string;
  followers: { total: number };
  images: Array<{ url: string }>;
  external_urls: { spotify: string };
  tracks: Tracks;
}

export interface Tracks {
  items: Item[];
}

export interface Item {
  added_at: string;
  is_local: boolean;
  track: Track;
}
