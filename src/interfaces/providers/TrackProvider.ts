import { type ArtistProviderDto } from './ArtistProvider';

export interface TrackProvider {
  getTrack: (id: string) => Promise<TrackProviderDto>;
}

export interface TrackProviderDto {
  id: string;
  name: string;
  preview_url: string;
  external_urls: { spotify: string };
  duration_ms: number;
  popularity: number;
  artists: ArtistProviderDto[];
  album: AlbumProviderDto;
}

export interface AlbumProviderDto {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  release_date: string;
  external_urls: { spotify: string };
}
