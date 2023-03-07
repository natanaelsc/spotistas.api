import { type UserProvider, type UserProviderDto } from '../UserProvider';

export class SpotifyUserProvider implements UserProvider {
  getUser = async (token: string): Promise<UserProviderDto> => {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const user: UserProviderDto = await response.json();
    return user;
  };
}
