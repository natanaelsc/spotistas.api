import { type Track } from './Track';

export interface Playlist {
  id: string;
  name: string;
  image: string;
  description: string;
  followers: number;
  external_url: string;
  tracks: Track[];
}
