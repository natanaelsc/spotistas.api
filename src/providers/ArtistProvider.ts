import { type TrackDto } from './TrackProvider';

export interface ArtistProvider {
  getArtistTopTracks: (token: string, id: string) => Promise<TrackDto[]>;
}

export interface ArtistDto {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  genres: string[];
  popularity: number;
}
