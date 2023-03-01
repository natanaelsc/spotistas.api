import env from '../config/env';

export class OAuthProvider {
  getRedirectUri(state: string): string {
    const redirectURI =
      'https://accounts.spotify.com/authorize?' +
      new URLSearchParams({
        client_id: env.spotify.client_id,
        response_type: 'code',
        redirect_uri: env.spotify.redirect_uri,
        state,
        scope: 'user-read-private user-read-email',
      }).toString();
    console.debug(`Redirect URI: ${redirectURI}`);
    return redirectURI;
  }
}
