export interface HttpResponse {
  cookie: (key: string, value: string, options: CookieOptions) => void;
  clearCookie: (key: string) => void;
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  FOUND = 302,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  TOO_MANY_REQUESTS = 429,
  SERVER_ERROR = 500,
}

export interface CookieOptions {
  name?: string | undefined;
  secret?: string | undefined;
  maxAge?: number | undefined;
  signed?: boolean | undefined;
  httpOnly?: boolean | undefined;
  path?: string | undefined;
  domain?: string | undefined;
  secure?: boolean | undefined;
  sameSite?: boolean | 'lax' | 'strict' | 'none' | undefined;
}
