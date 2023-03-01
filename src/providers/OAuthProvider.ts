import env from '../config/env';

export class OAuthProvider {
  getRedirectUri(state: string): string {
    const redirectURI =
      'https://accounts.spotify.com/authorize?' +
      new URLSearchParams({
        client_id: env.spotify.client_id,
        response_type: 'code',
        redirect_uri: env.spotify.redirect_uri,
        state,
        scope: 'user-read-private user-read-email',
      }).toString();
    console.debug(`Redirect URI: ${redirectURI}`);
    return redirectURI;
  }

  async getToken(code: string): Promise<OAuthProviderResponse> {
    const response: OAuthProviderResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: env.spotify.redirect_uri,
        client_id: env.spotify.client_id,
        client_secret: env.spotify.client_secret,
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
  }
}

interface OAuthProviderResponse {
  access_token: string;
  refresh_token: string;
}
