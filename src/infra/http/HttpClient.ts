/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from '../../main/config/logger';
import { ErrorHandler, type CustomError } from '../../presentation/errors';
import { HttpContentType, HttpMethod, type HttpClientResponse } from '../../presentation/http';
import { Spotify } from '../apis/Spotify';
import { type HttpClientOptions } from './HttpClientOptions';

export class HttpClient {
  static connect = async (url: string, token: Token, clientOptions?: HttpClientOptions): Promise<CustomResponse> => {
    url = this.setURL(url);
    token = this.setToken(token);
    const method = clientOptions?.method ?? HttpMethod.GET;
    const contetType = clientOptions?.contentType ?? HttpContentType.JSON;
    const body = this.setBody(clientOptions?.body, contetType);
    try {
      const data: HttpClientResponse = await fetch(url, {
        method,
        headers: {
          Authorization: token,
          'Content-Type': contetType,
        },
        body,
      });
      logger.http(`${method}`, `${url.replace('https://', '')}`, `${contetType}`, body, data.status);
      ErrorHandler.response(data);
      return await data.json();
    } catch (error) {
      return ErrorHandler.catch(error);
    }
  };

  private static readonly setURL = (url: string): string => {
    return url.startsWith('https://') ? url : `${Spotify.baseURL}/${url}`;
  };

  private static readonly setToken = (token: Token): string => {
    logger.debug('Token:', token?.slice(0, 150));
    return token != null ? `Bearer ${token}` : '';
  };

  private static readonly setBody = (data: any, contentType: string): any => {
    return contentType === HttpContentType.FORM ? new URLSearchParams(data) : JSON.stringify(data);
  };
}

type Token = string | null;

type CustomResponse = HttpClientResponse | CustomError | any;
