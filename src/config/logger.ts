/* eslint-disable @typescript-eslint/no-explicit-any */
import config from './env';

const level = {
  trace: 0,
  debug: 1,
  info: 2,
  http: 3,
  warn: 4,
  error: 5,
  fatal: 6,
};

const format = {
  color: {
    black: '\x1b[30m%s\x1b[0m',
    red: '\x1b[31m%s\x1b[0m',
    green: '\x1b[32m%s\x1b[0m',
    yellow: '\x1b[33m%s\x1b[0m',
    blue: '\x1b[34m%s\x1b[0m',
    magenta: '\x1b[35m%s\x1b[0m',
    cyan: '\x1b[36m%s\x1b[0m',
  },
  stile: {
    bold: '\x1b[1m%s\x1b[0m',
    faint: '\x1b[2m%s\x1b[0m',
    italic: '\x1b[3m%s\x1b[0m',
    underline: '\x1b[4m%s\x1b[0m',
    inverse: '\x1b[7m%s\x1b[0m',
    strikethrough: '\x1b[9m%s\x1b[0m',
  },
};

const { log_level: logLevel } = config.node;

const logger = {
  trace: (...args: any): void => {
    level[logLevel === 'trace' ? 'trace' : 'info'] <= 0 && console.info(`[${format.color.cyan}]`, 'TRACE', ...args);
  },
  debug: (...args: any): void => {
    level[logLevel === 'debug' ? 'debug' : 'info'] <= 1 && console.debug(`[${format.color.blue}]`, 'DEBUG', ...args);
  },
  info: (...args: any): void => {
    level[logLevel === 'info' ? 'info' : 'debug'] <= 2 && console.info(`[${format.color.cyan}]`, 'INFO', ...args);
  },
  http: (...args: any): void => {
    level[logLevel === 'http' ? 'http' : 'info'] <= 3 && console.info(`[${format.color.green}]`, 'HTTP', ...args);
  },
  warn: (...args: any): void => {
    level[logLevel === 'warn' ? 'warn' : 'info'] <= 4 && console.warn(`[${format.color.yellow}]`, 'WARN', ...args);
  },
  error: (...args: any): void => {
    level[logLevel === 'error' ? 'error' : 'info'] <= 5 && console.error(`[${format.color.red}]`, 'ERROR', ...args);
  },
  fatal: (...args: any): void => {
    level[logLevel === 'fatal' ? 'fatal' : 'info'] <= 6 && console.error(`[${format.color.magenta}]`, 'FATAL', ...args);
  },
};

export default logger;
