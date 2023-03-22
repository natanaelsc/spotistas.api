export interface UserProvider {
  getUser: (token: string) => Promise<UserProviderDto>;
}

export interface UserProviderDto {
  id: string;
  display_name: string;
  email: string;
  images: Array<{ url: string }>;
  followers: { total: number };
  external_urls: { spotify: string };
  country: string;
  product: string;
  explicit_content: ExplicitContent;
}

export interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}
