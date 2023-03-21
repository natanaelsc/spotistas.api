/* eslint-disable @typescript-eslint/no-explicit-any */

export enum Level {
  trace = 0,
  debug = 1,
  info = 2,
  http = 3,
  warn = 4,
  error = 5,
  fatal = 6,
}

export enum Color {
  BLACK = '\x1b[30m%s\x1b[0m',
  RED = '\x1b[31m%s\x1b[0m',
  GREEN = '\x1b[32m%s\x1b[0m',
  YELLOW = '\x1b[33m%s\x1b[0m',
  BLUE = '\x1b[34m%s\x1b[0m',
  MAGENTA = '\x1b[35m%s\x1b[0m',
  CYAN = '\x1b[36m%s\x1b[0m',
}

export enum Stile {
  BOLD = '\x1b[1m%s\x1b[0m',
  FAINT = '\x1b[2m%s\x1b[0m',
  ITALIC = '\x1b[3m%s\x1b[0m',
  UNDERLINE = '\x1b[4m%s\x1b[0m',
  INVERSE = '\x1b[7m%s\x1b[0m',
  STRIKETHROUGH = '\x1b[9m%s\x1b[0m',
}

const level = process.env.LOG_LEVEL ?? 'debug';

const logger = {
  trace: (...args: any): void => {
    Level[level === 'trace' ? 'trace' : 'info'] <= 0 && console.info(`[${Color.CYAN}]`, 'TRACE', ...args);
  },
  debug: (...args: any): void => {
    Level[level === 'debug' ? 'debug' : 'info'] <= 1 && console.debug(`[${Color.BLUE}]`, 'DEBUG', ...args);
  },
  info: (...args: any): void => {
    Level[level === 'info' ? 'info' : 'debug'] <= 2 && console.info(`[${Color.CYAN}]`, 'INFO', ...args);
  },
  http: (...args: any): void => {
    Level[level === 'http' ? 'http' : 'info'] <= 3 && console.info(`[${Color.GREEN}]`, 'HTTP', ...args);
  },
  warn: (...args: any): void => {
    Level[level === 'warn' ? 'warn' : 'info'] <= 4 && console.warn(`[${Color.YELLOW}]`, 'WARN', ...args);
  },
  error: (...args: any): void => {
    Level[level === 'error' ? 'error' : 'info'] <= 5 && console.error(`[${Color.RED}]`, 'ERROR', ...args);
  },
  fatal: (...args: any): void => {
    Level[level === 'fatal' ? 'fatal' : 'info'] <= 6 && console.error(`[${Color.MAGENTA}]`, 'FATAL', ...args);
  },
};

export default logger;
