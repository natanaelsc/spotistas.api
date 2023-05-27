import { type TrackDto } from './TrackDto';

export interface PlaylistDto {
  id: string;
  name: string;
  image: string;
  description: string;
  followers?: number;
  external_url: string;
  tracks?: TrackDto[];
}
