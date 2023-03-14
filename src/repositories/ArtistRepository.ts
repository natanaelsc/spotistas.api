import { type Artist } from '../interfaces/models/Artist';

export class ArtistRepository {
  private readonly artistMonth: Artist = {
    id: '6M2wZ9GZgrQXHCFfjv46we',
    name: 'Dua Lipa',
    image: 'https://i.scdn.co/image/ab6761610000e5ebd42a27db3286b58553da8858',
    genres: ['dance pop', 'pop', 'uk pop'],
    popularity: 90,
    followers: 38999408,
    external_url: 'https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we',
  };

  getArtistMonth = async (): Promise<Artist> => {
    return this.artistMonth;
  };
}
