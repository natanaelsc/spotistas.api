export class Convert {
  public static timeFormat(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? `0${seconds}` : seconds}`;
  }

  public static fromTimeFormat(duration: string): number {
    const [minutes, seconds] = duration.split(':');
    return Number(minutes) * 60000 + Number(seconds) * 1000;
  }

  public static toSeconds(duration: string): number {
    const [value, unit] = duration.split(/(\d+)/).slice(1);
    switch (unit) {
      case 's':
        return Number(value);
      case 'm':
        return Number(value) * 60;
      case 'h':
        return Number(value) * 3600;
      case 'd':
        return Number(value) * 86400;
      default:
        return Number(value);
    }
  }

  public static jwtExpiryTime(expiresIn: number | undefined): number {
    expiresIn ??= 0;
    const now = new Date().getTime();
    const exp = new Date(expiresIn * 1000).getTime();
    return Math.round((exp - now) / 60000);
  }
}
