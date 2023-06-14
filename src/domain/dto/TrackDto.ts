import { type AlbumDto } from './AlbumDto';
import { type ArtistDto } from './ArtistDto';

export interface TrackDto {
  id: string;
  name: string;
  image: string;
  preview_url: string;
  external_url: string;
  duration_ms: number;
  popularity: number;
  artists?: ArtistDto[];
  album: AlbumDto;
}

export interface MusicOfTheDay extends TrackDto {
  note: string;
}
