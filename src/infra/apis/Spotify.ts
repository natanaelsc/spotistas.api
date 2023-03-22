import { Env } from '../../main/config';
import logger from '../../main/config/logger';
import { HttpContentType, HttpMethod } from '../../presentation/http';
import { Convert } from '../helpers';
import { HttpClient } from '../http/HttpClient';
import Jwt from '../utils/Jwt';

export class Spotify {
  private static readonly _baseURL = 'https://api.spotify.com/v1';

  public static get baseURL(): string {
    return this._baseURL;
  }

  public static readonly api = async (): Promise<string> => {
    let token = Env.get('SPOTIFY_CLIENT_TOKEN');
    token ?? (token = await this.getToken());
    const isExpired = await Jwt.verify(token);
    isExpired && (token = await this.getToken());
    Env.set('SPOTIFY_CLIENT_TOKEN', token);
    const jwt = await Jwt.decode(token);
    logger.debug('Spotify Token Expires in', Convert.jwtExpiryTime(jwt.exp), 'minutes');
    return jwt.access_token;
  };

  private static readonly getToken = async (): Promise<string> => {
    const response = await HttpClient.connect('https://accounts.spotify.com/api/token', null, {
      method: HttpMethod.POST,
      contentType: HttpContentType.FORM,
      body: {
        grant_type: 'client_credentials',
        client_id: Env.get('SPOTIFY_CLIENT_ID'),
        client_secret: Env.get('SPOTIFY_CLIENT_SECRET'),
      },
    });
    const { access_token, expires_in } = response;
    const expiresIn = (Number(expires_in / 60) - 5) | 55;
    return await Jwt.sign({ access_token }, `${expiresIn}m`);
  };
}
