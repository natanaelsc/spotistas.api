export default interface HttpClient {
  get: <T>(url: string, token?: string) => Promise<T>;
  post: <T>(url: string, body: any) => Promise<T>;
}
