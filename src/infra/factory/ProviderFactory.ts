import type ArtistProvider from '../../application/provider/ArtistProvider';
import type OAuthProvider from '../../application/provider/OAuthProvider';
import type PlaylistProvider from '../../application/provider/PlaylistProvider';
import type TrackProvider from '../../application/provider/TrackProvider';
import type UserProvider from '../../application/provider/UserProvider';
import SpotifyArtistProvider from '../external/spotify/api/SpotifyArtistProvider';
import SpotifyOAuthProvider from '../external/spotify/api/SpotifyOAuthProvider';
import SpotifyPlaylistProvider from '../external/spotify/api/SpotifyPlaylistProvider';
import SpotifyTrackProvider from '../external/spotify/api/SpotifyTrackProvider';
import SpotifyUserProvider from '../external/spotify/api/SpotifyUserProvider';
import type HttpClient from '../http/HttpClient';

export default class ProviderFactory {
  constructor(private readonly httpClient: HttpClient) {}

  createOAuthProvider = (): OAuthProvider => {
    return new SpotifyOAuthProvider(this.httpClient);
  };

  createUserProvider = (): UserProvider => {
    return new SpotifyUserProvider(this.httpClient);
  };

  createTrackProvider = (): TrackProvider => {
    return new SpotifyTrackProvider(this.httpClient);
  };

  createArtistProvider = (): ArtistProvider => {
    return new SpotifyArtistProvider(this.httpClient);
  };

  createPlaylistProvider = (): PlaylistProvider => {
    return new SpotifyPlaylistProvider(this.httpClient);
  };
}
