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
}
