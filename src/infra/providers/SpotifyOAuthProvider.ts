import { type OAuthProvider, type OAuthProviderDto } from '../../interfaces/providers';
import { Env } from '../../main/config';

export class SpotifyOAuthProvider implements OAuthProvider {
  private readonly _clientId = Env.get('SPOTIFY_CLIENT_ID');
  private readonly _clientSecret = Env.get('SPOTIFY_CLIENT_SECRET');
  private readonly _redirectUri = Env.get('SPOTIFY_REDIRECT_URI');
  private readonly _scope = Env.get('SPOTIFY_SCOPE');
  private readonly _showDialog = Env.get('SPOTIFY_SHOW_DIALOG');

  getRedirectUri = (state: string): string => {
    const redirectUri =
      'https://accounts.spotify.com/authorize?' +
      new URLSearchParams({
        client_id: this._clientId,
        response_type: 'code',
        redirect_uri: this._redirectUri,
        state,
        scope: this._scope,
        show_dialog: this._showDialog,
      }).toString();
    return redirectUri;
  };

  getToken = async (code: string): Promise<OAuthProviderDto> => {
    const response: Response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: this._redirectUri,
        client_id: this._clientId,
        client_secret: this._clientSecret,
      }),
    });
    const data: OAuthProviderDto = await response.json();
    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    };
  };
}
