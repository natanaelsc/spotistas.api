export interface HttpResponse {
  cookie: (key: string, value: string, options: CookieOptions) => void;
  clearCookie: (key: string) => void;
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
