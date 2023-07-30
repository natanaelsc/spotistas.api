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

export class ProviderFactory {
  createOAuthProvider = (): OAuthProvider => {
    return new SpotifyOAuthProvider();
  };

  createUserProvider = (): UserProvider => {
    return new SpotifyUserProvider();
  };

  createTrackProvider = (): TrackProvider => {
    return new SpotifyTrackProvider();
  };

  createArtistProvider = (): ArtistProvider => {
    return new SpotifyArtistProvider();
  };

  createPlaylistProvider = (): PlaylistProvider => {
    return new SpotifyPlaylistProvider();
  };
}
