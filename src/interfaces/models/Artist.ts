import { type Track } from './Track';

export interface Artist {
  id: string;
  name: string;
  image: string;
  genres: string[];
  popularity: number;
  followers: number;
  external_url: string;
}

export interface ArtistMonth extends Artist {
  tracks: Track[];
}
