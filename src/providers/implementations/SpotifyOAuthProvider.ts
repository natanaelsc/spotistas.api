import config from '../../config/env';
import { type OAuthProvider, type OAuthProviderDto } from '../OAuthProvider';

export class SpotifyOAuthProvider implements OAuthProvider {
  private readonly clientId = config.spotify.client_id;
  private readonly clientSecret = config.spotify.client_secret;
  private readonly redirectUri = config.spotify.redirect_uri;
  private readonly scope = config.spotify.scope;
  private readonly showDialog = config.spotify.show_dialog;

  getRedirectUri = (state: string): string => {
    const redirectUri =
      'https://accounts.spotify.com/authorize?' +
      new URLSearchParams({
        client_id: this.clientId,
        response_type: 'code',
        redirect_uri: this.redirectUri,
        state,
        scope: this.scope,
        show_dialog: this.showDialog,
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
        redirect_uri: this.redirectUri,
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }),
    });
    const data: OAuthProviderDto = await response.json();
    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    };
  };
}
