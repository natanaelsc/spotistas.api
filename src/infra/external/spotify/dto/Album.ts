export default interface Album {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  release_date: string;
  external_urls: { spotify: string };
}
