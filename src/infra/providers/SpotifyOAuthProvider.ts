import { type OAuthProvider, type OAuthProviderDto } from '../../interfaces/providers';
import { Env } from '../../main/config';
import logger from '../../main/config/logger';
import { HttpContentType, HttpMethod } from '../../presentation/http';
import { HttpClient } from '../http/HttpClient';

export class SpotifyOAuthProvider implements OAuthProvider {
  private readonly _path = 'https://accounts.spotify.com';
  private readonly _clientId = Env.get('SPOTIFY_CLIENT_ID');
  private readonly _clientSecret = Env.get('SPOTIFY_CLIENT_SECRET');
  private readonly _redirectUri = Env.get('SPOTIFY_REDIRECT_URI');
  private readonly _scope = Env.get('SPOTIFY_SCOPE');
  private readonly _showDialog = Env.get('SPOTIFY_SHOW_DIALOG');

  getRedirectUri = (state: string): string => {
    const query = new URLSearchParams({
      client_id: this._clientId,
      response_type: 'code',
      redirect_uri: this._redirectUri,
      state,
      scope: this._scope,
      show_dialog: this._showDialog,
    }).toString();
    const redirectURI = `${this._path}/authorize?${query}`;
    return redirectURI;
  };

  exchangeCode = async (code: string): Promise<OAuthProviderDto> => {
    const token = await HttpClient.connect(`${this._path}/api/token`, null, {
      method: HttpMethod.POST,
      contentType: HttpContentType.FORM,
      body: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: this._redirectUri,
        client_id: this._clientId,
        client_secret: this._clientSecret,
      },
    });
    logger.debug('OAuthProvider:', token);
    return token;
  };
}
