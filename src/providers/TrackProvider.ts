export interface TrackProvider {
  getTrack: (token: string, id: string) => Promise<TrackProviderDto>;
}

export interface TrackProviderDto {
  id: string;
  name: string;
  preview_url: string;
  external_urls: { spotify: string };
  duration_ms: number;
  album: AlbumProviderDto;
}

export interface AlbumProviderDto {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  external_urls: { spotify: string };
}
