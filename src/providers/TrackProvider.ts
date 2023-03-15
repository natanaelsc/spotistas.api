export interface TrackProvider {
  getTrack: (token: string, id: string) => Promise<TrackDto>;
}

export interface TrackDto {
  id: string;
  name: string;
  album: AlbumDto;
  preview_url: string;
  external_urls: { spotify: string };
}

export interface AlbumDto {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  external_urls: { spotify: string };
}
