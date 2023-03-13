import { type Artist } from '../interfaces/models/Artist';
import { type ArtistRepository } from '../repositories/ArtistRepository';

export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}
  getArtistMonth = async (): Promise<Artist> => {
    const artist = await this.artistRepository.getArtistMonth();
    return artist;
  };
}
