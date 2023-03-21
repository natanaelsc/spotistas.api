export interface HttpRequest {
  cookies: Record<string, string>;
}

export enum HttpContentType {
  JSON = 'application/json',
  FORM = 'application/x-www-form-urlencoded',
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}
