export interface OAuthProvider {
  getRedirectUri: (state: string) => string;
  exchangeCode: (code: string) => Promise<OAuthProviderDto>;
}

export interface OAuthProviderDto {
  access_token: string;
  refresh_token: string;
}
