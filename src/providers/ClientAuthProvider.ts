export interface ClientAuthProvider {
  getAccessToken: (client_id: string, client_secret: string) => Promise<string>;
}
