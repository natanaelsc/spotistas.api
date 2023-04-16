/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorHandler, type CustomError } from '../../presentation/errors';
import { HttpContentType, HttpMethod, type HttpClientResponse } from '../../presentation/http';

export class HttpClient {
  static get = async (url: string, token: string): Promise<CustomResponse> => {
    token = this.setToken(token);
    try {
      const data: HttpClientResponse = await fetch(url, {
        method: HttpMethod.GET,
        headers: {
          Authorization: token,
          'Content-Type': HttpContentType.JSON,
        },
      });
      ErrorHandler.response(data);
      return await data.json();
    } catch (error) {
      return ErrorHandler.catch(error);
    }
  };

  static post = async (url: string, body?: any, contentType?: string): Promise<CustomResponse> => {
    contentType = contentType ?? HttpContentType.JSON;
    body = this.setBody(body, contentType);
    try {
      const data: HttpClientResponse = await fetch(url, {
        method: HttpMethod.POST,
        headers: {
          'Content-Type': contentType,
        },
        body,
      });
      ErrorHandler.response(data);
      return await data.json();
    } catch (error) {
      return ErrorHandler.catch(error);
    }
  };

  private static readonly setToken = (token: Token): string => {
    return token != null ? `Bearer ${token}` : '';
  };

  private static readonly setBody = (data: any, contentType: string): any => {
    return contentType === HttpContentType.FORM ? new URLSearchParams(data) : JSON.stringify(data);
  };
}

type Token = string | null;

type CustomResponse = HttpClientResponse | CustomError | any;
