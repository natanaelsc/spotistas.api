import { type UserProvider, type UserProviderDto } from '../../interfaces/providers';
import { HttpClient } from '../http/HttpClient';

export class SpotifyUserProvider implements UserProvider {
  private readonly _path = 'me';

  getUser = async (token: string): Promise<UserProviderDto> => {
    const user = await HttpClient.connect(this._path, token);
    return user as UserProviderDto;
  };
}
