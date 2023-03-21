import { type TrackProviderDto } from './TrackProvider';

export interface ArtistProvider {
  getArtist: (token: string, id: string) => Promise<ArtistProviderDto>;
  getArtistTopTracks: (token: string, id: string) => Promise<TrackProviderDto[]>;
}

export interface ArtistProviderDto {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  genres: string[];
  popularity: number;
  followers: { total: number };
  external_urls: { spotify: string };
}
