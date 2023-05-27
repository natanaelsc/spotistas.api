import { type TrackDto } from './TrackDto';

export interface ArtistDto {
  id: string;
  name: string;
  image?: string;
  genres?: string[];
  popularity?: number;
  followers?: number;
  external_url: string;
}

export interface ArtistMonthDto extends ArtistDto {
  tracks: TrackDto[];
}
