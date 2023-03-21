import { type ClientAuthProvider } from '../../interfaces/providers';
import { Env } from '../../main/config/Env';

export class SpotifyClientAuthProvider implements ClientAuthProvider {
  private readonly clientId = Env.get('SPOTIFY_CLIENT_ID');
  private readonly clientSecret = Env.get('SPOTIFY_CLIENT_SECRET');

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
