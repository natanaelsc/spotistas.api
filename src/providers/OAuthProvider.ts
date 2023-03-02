export interface OAuthProvider {
  getRedirectUri: (state: string) => string;
  getToken: (code: string) => Promise<OAuthProviderResponse>;
}

export interface OAuthProviderResponse {
  access_token: string;
  refresh_token: string;
}
