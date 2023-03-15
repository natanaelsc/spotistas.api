import { type Album } from './Album';

export interface Track {
  id: string;
  name: string;
  image: string;
  preview_url: string;
  external_url: string;
  album: Album;
}
