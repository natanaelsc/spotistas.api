import { type Album } from './Album';
import { type Artist } from './Artist';

export interface Track {
  id: string;
  name: string;
  image: string;
  preview_url: string;
  external_url: string;
  duration_ms: number;
  popularity: number;
  artists?: Artist[];
  album: Album;
}
