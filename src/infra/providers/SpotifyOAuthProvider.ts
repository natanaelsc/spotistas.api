import { type OAuthProvider, type OAuthProviderDto } from '../../interfaces/providers';
import { Env } from '../../main/config';
import logger from '../../main/config/logger';
import { HttpContentType } from '../../presentation/http';
import { HttpClient } from '../http/HttpClient';

export class SpotifyOAuthProvider implements OAuthProvider {
  private readonly baseUrl = 'https://accounts.spotify.com';
  private readonly clientId = Env.get('SPOTIFY_CLIENT_ID');
  private readonly clientSecret = Env.get('SPOTIFY_CLIENT_SECRET');
  private readonly redirectUri = Env.get('SPOTIFY_REDIRECT_URI');
  private readonly scope = Env.get('SPOTIFY_SCOPE');
  private readonly showDialog = Env.get('SPOTIFY_SHOW_DIALOG');

  getRedirectUri = (state: string): string => {
    const query = new URLSearchParams({
      client_id: this.clientId,
      response_type: 'code',
      redirect_uri: this.redirectUri,
      state,
      scope: this.scope,
      show_dialog: this.showDialog,
    }).toString();
    const redirectURI = `${this.baseUrl}/authorize?${query}`;
    return redirectURI;
  };

  exchangeCode = async (code: string): Promise<OAuthProviderDto> => {
    const token = await HttpClient.post(
      `${this.baseUrl}/api/token`,
      {
        grant_type: 'authorization_code',
        code,
        redirect_uri: this.redirectUri,
        client_id: this.clientId,
        client_secret: this.clientSecret,
      },
      HttpContentType.FORM
    );
    logger.debug('OAuthProvider:', token);
    return token;
  };
}
