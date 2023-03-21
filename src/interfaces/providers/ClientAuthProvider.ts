export interface ClientAuthProvider {
  getAccessToken: () => Promise<string>;
}
