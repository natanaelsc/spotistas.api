import type OAuthProvider from '../../../../application/provider/OAuthProvider';
import { Env } from '../../../../main/config';
import logger from '../../../../main/config/logger';
import type HttpClient from '../../../http/HttpClient';
import type OAuth from '../dto/OAuth';

export default class SpotifyOAuthProvider implements OAuthProvider {
  private readonly baseUrl = 'https://accounts.spotify.com';
  private readonly clientId = Env.get('SPOTIFY_CLIENT_ID');
  private readonly clientSecret = Env.get('SPOTIFY_CLIENT_SECRET');
  private readonly redirectUri = Env.get('SPOTIFY_REDIRECT_URI');
  private readonly scope = Env.get('SPOTIFY_SCOPE');
  private readonly showDialog = Env.get('SPOTIFY_SHOW_DIALOG');

  constructor(private readonly httpClient: HttpClient) {}

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

  exchangeCode = async (code: string): Promise<OAuth> => {
    const url = `${this.baseUrl}/api/token`;
    const data = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.redirectUri,
      client_id: this.clientId,
      client_secret: this.clientSecret,
    });
    const token = await this.httpClient.post<OAuth>(url, data);
    logger.debug(token);
    return token;
  };
}
