import { Env } from '../../../main/config';
import logger from '../../../main/config/logger';
import { Convert } from '../../helpers';
import FetchAdapter from '../../http/FetchAdapter';
import type HttpClient from '../../http/HttpClient';
import Jwt from '../../utils/Jwt';

export default class Spotify {
  private static httpClient: HttpClient;

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

  public static readonly setTimeRange = (timeRange: string): string => {
    if (timeRange === 'short') return TimeRange.SHORT;
    if (timeRange === 'medium') return TimeRange.MEDIUM;
    if (timeRange === 'long') return TimeRange.LONG;
    return TimeRange.MEDIUM;
  };

  private static readonly getClientToken = async (): Promise<string> => {
    const url = 'https://accounts.spotify.com/api/token';
    const data = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: Env.get('SPOTIFY_CLIENT_ID'),
      client_secret: Env.get('SPOTIFY_CLIENT_SECRET'),
    });
    const response = await this.httpClient.post<Token>(url, data);
    logger.debug(response);
    const { access_token, expires_in } = response;
    const expiresIn = (Number(expires_in / 60) - 5) | 55;
    const token = await Jwt.sign({ access_token }, `${expiresIn}m`);
    return token;
  };

  static {
    this.httpClient = new FetchAdapter();
  }
}

export enum TimeRange {
  SHORT = 'short_term',
  MEDIUM = 'medium_term',
  LONG = 'long_term',
}

interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
}
