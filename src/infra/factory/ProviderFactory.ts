import { type ArtistProvider } from '../../application/provider/ArtistProvider';
import { type OAuthProvider } from '../../application/provider/OAuthProvider';
import { type PlaylistProvider } from '../../application/provider/PlaylistProvider';
import { type TrackProvider } from '../../application/provider/TrackProvider';
import { type UserProvider } from '../../application/provider/UserProvider';
import {
  SpotifyArtistProvider,
  SpotifyOAuthProvider,
  SpotifyPlaylistProvider,
  SpotifyTrackProvider,
  SpotifyUserProvider,
} from '../providers';

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
