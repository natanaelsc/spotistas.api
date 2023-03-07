import { type ClientAuthProvider } from './../ClientAuthProvider';

export class SpotifyClientAuthProvider implements ClientAuthProvider {
  getAccessToken = async (client_id: string, client_secret: string): Promise<string> => {
    const response: Response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id,
        client_secret,
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
