import { type Artist } from '../interfaces/models/Artist';

export class ArtistRepository {
  private readonly artistMonth: Artist = {
    id: '7dGJo4pcD2V6oG8kP0tJRR',
    name: 'Eminem',
    image: 'https://i.scdn.co/image/ab6761610000e5eba00b11c129b27a88fc72f36b',
    genres: ['hip hop', 'rap'],
    popularity: 94,
    followers: 67303332,
    external_url: 'https://open.spotify.com/artist/7dGJo4pcD2V6oG8kP0tJRR',
  };

  getArtistMonth = async (): Promise<Artist> => {
    return this.artistMonth;
  };
}
