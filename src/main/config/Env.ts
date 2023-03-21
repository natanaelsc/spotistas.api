import { Convert } from '../../infra/helpers';
import logger from './logger';

export class Env {
  public static readonly isProduction = (): boolean => process.env.NODE_ENV === 'production';
  public static readonly isDevelopment = (): boolean => process.env.NODE_ENV === 'development';

  public static readonly get = (key: string, defaultValue?: string): string => {
    this.setDefaultValue(key, defaultValue);
    return String(process.env[key]);
  };

  public static readonly getList = (key: string, defaultValue?: string[]): string[] => {
    this.setDefaultValue(key, defaultValue);
    return String(process.env[key]).split(',');
  };

  public static readonly getNumber = (key: string, defaultValue?: number): number => {
    this.setDefaultValue(key, defaultValue);
    return Number(process.env[key]);
  };

  private static readonly set = (key: string, value: EnvType): void => {
    process.env[key] = String(value) ?? '';
  };

  private static readonly setDefaultValue = (key: string, value: EnvType): void => {
    if (process.env[key] == null) this.set(key, value);
    if (process.env[key] === '') this.set(key, value);
    if (process.env[key] === 'undefined') this.set(key, value);
  };

  public static get stdTTL(): number {
    const str = this.get('CACHE_TTL', '30m');
    const ttl = Convert.toSeconds(str);
    return Number.isNaN(ttl) ? 0 : ttl;
  }

  static {
    this.isProduction() && logger.info('🚀 Production Mode\n');
    this.isDevelopment() && logger.info('🚀 Development Mode\n');
    logger.debug('CLIENT ID:', this.get('SPOTIFY_CLIENT_ID'));
    logger.debug('CLIENT SECRET:', this.get('SPOTIFY_CLIENT_SECRET'));
    logger.debug('REDIRECT URI:', this.get('SPOTIFY_REDIRECT_URI'));
    logger.debug('CLIENT URI:', this.get('CLIENT_URI'));
    logger.debug('SCOPE:', this.get('SPOTIFY_SCOPE'));
    logger.debug('SHOW DIALOG:', this.get('SPOTIFY_SHOW_DIALOG'));
    logger.debug('JWT SECRET:', this.get('JWT_SECRET'));
    logger.debug('JWT EXPIRES IN:', this.get('JWT_EXPIRES_IN'), '\n');
  }
}

export type EnvType = string | number | undefined | string[];
