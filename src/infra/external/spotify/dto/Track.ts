import type Album from './Album';
import type Artist from './Artist';

export default interface Track {
  id: string;
  name: string;
  preview_url: string;
  external_urls: { spotify: string };
  duration_ms: number;
  popularity: number;
  artists: Artist[];
  album: Album;
}
