export interface UserProvider {
  getUser: (token: string) => Promise<UserProviderDto>;
}

export interface UserProviderDto {
  id: string;
  display_name: string;
  email: string;
  images: Array<{ url: string }>;
}
