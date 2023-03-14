import config from '../../config/env';
import { type ClientAuthProvider } from './../ClientAuthProvider';

export class SpotifyClientAuthProvider implements ClientAuthProvider {
  private readonly clientId = config.spotify.client_id;
  private readonly clientSecret = config.spotify.client_secret;

  getAccessToken = async (): Promise<string> => {
    const response: Response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }),
    });
    let accessToken;
    if (response.ok) {
      const data = await response.json();
      accessToken = data.access_token;
    }
    return accessToken;
  };
}
