import logger from './logger';

export class Env {
  public static readonly isProduction = (): boolean => process.env.NODE_ENV === 'production';
  public static readonly isDevelopment = (): boolean => process.env.NODE_ENV === 'development';

  public static readonly get = (key: string, defaultValue = ''): string => {
    return String(process.env[key]) ?? defaultValue;
  };

  public static readonly getList = (key: string, defaultValue: string[] = []): string[] => {
    return process.env[key]?.split(',') ?? defaultValue;
  };

  public static readonly getNumber = (key: string, defaultValue = 0): number => {
    return Number(process.env[key]) ?? defaultValue;
  };

  public static readonly set = (key: string, value: EnvType): void => {
    process.env[key] = value?.toString() ?? '';
  };

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
