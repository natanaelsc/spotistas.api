import { SpotifyOAuthProvider } from '../../infra/providers';
import { OAuthController } from '../../presentation/controllers';

export class OAuthControllerFactory {
  static create = (): OAuthController => {
    const spotifyOAuthProvider = new SpotifyOAuthProvider();
    return new OAuthController(spotifyOAuthProvider);
  };
}
