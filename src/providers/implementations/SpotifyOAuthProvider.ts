import env from '../../config/env';
import { type OAuthProvider, type OAuthProviderResponse } from '../OAuthProvider';

class SpotifyOAuthProvider implements OAuthProvider {
  private readonly clientId: string = env.spotify.client_id;
  private readonly clientSecret: string = env.spotify.client_secret;
  private readonly redirectURI: string = env.spotify.redirect_uri;

  getRedirectUri = (state: string): string => {
    const redirectURI =
      'https://accounts.spotify.com/authorize?' +
      new URLSearchParams({
        client_id: this.clientId,
        response_type: 'code',
        redirect_uri: this.redirectURI,
        state,
        scope: 'user-read-private user-read-email',
      }).toString();
    console.debug(`Redirect URI: ${redirectURI}`);
    return redirectURI;
  };

  getToken = async (code: string): Promise<OAuthProviderResponse> => {
    const response: OAuthProviderResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: this.redirectURI,
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(async res => await res.json())
      .catch(err => {
        console.error(err);
      });
    const token: OAuthProviderResponse = {
      access_token: response.access_token,
      refresh_token: response.refresh_token,
    };
    return token;
  };
}

export default SpotifyOAuthProvider;
