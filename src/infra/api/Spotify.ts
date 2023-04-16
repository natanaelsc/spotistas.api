/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from '../../main/config';
import logger from '../../main/config/logger';
import { HttpContentType } from '../../presentation/http';
import { Convert } from '../helpers';
import { HttpClient } from '../http/HttpClient';
import Jwt from '../utils/Jwt';

export class Spotify {
  private static readonly baseUrl = 'https://api.spotify.com/v1';

  public static readonly api = async (path: string, token?: string): Promise<any> => {
    token = token ?? (await this.getToken());
    const data = await HttpClient.get(`${this.baseUrl}/${path}`, token);
    return data;
  };

  public static readonly getToken = async (): Promise<string> => {
    let token = Env.get('SPOTIFY_CLIENT_TOKEN');
    token ?? (token = await this.getClientToken());
    const isExpired = await Jwt.verify(token);
    isExpired && (token = await this.getClientToken());
    Env.set('SPOTIFY_CLIENT_TOKEN', token);
    const jwt = await Jwt.decode(token);
    logger.debug('Spotify Token Expires in', Convert.jwtExpiryTime(jwt.exp), 'minutes');
    return jwt.access_token;
  };

  private static readonly getClientToken = async (): Promise<string> => {
    const response = await HttpClient.post(
      'https://accounts.spotify.com/api/token',
      {
        grant_type: 'client_credentials',
        client_id: Env.get('SPOTIFY_CLIENT_ID'),
        client_secret: Env.get('SPOTIFY_CLIENT_SECRET'),
      },
      HttpContentType.FORM
    );
    const { access_token, expires_in } = response;
    const expiresIn = (Number(expires_in / 60) - 5) | 55;
    const token = await Jwt.sign({ access_token }, `${expiresIn}m`);
    return token;
  };
}

export enum TimeRange {
  SHORT = 'short_term',
  MEDIUM = 'medium_term',
  LONG = 'long_term',
}
