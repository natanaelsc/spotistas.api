/* eslint-disable @typescript-eslint/no-explicit-any */
import { type HttpContentType, type HttpMethod } from '../../presentation/http';

export interface HttpClientOptions {
  method: HttpMethod;
  contentType: HttpContentType;
  body: any | null;
}
