import type OAuth from '../../infra/external/spotify/dto/OAuth';

export default interface OAuthProvider {
  getRedirectUri: (state: string) => string;
  exchangeCode: (code: string) => Promise<OAuth>;
}
