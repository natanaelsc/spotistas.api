import logger from '../../config/logger';
import { HttpStatus, type HttpClientResponse } from '../http';
import { CustomError } from './CustomError';

export class ErrorHandler {
  public static catch = (error: unknown): CustomError => {
    if (CustomError.isCustomError(error)) {
      logger.error({
        status: error.status,
        message: error.message,
      });
    } else {
      logger.error(error);
    }
    return CustomError.isCustomError(error)
      ? new CustomError(error.status, error.message)
      : new CustomError(HttpStatus.SERVER_ERROR, 'something went wrong');
  };

  public static response = (res: HttpClientResponse): void => {
    if (!res.ok) {
      if (res.status === HttpStatus.UNAUTHORIZED) {
        logger.error('bad or expired token');
        throw new CustomError(res.status, res.statusText ?? res.message);
      }
      if (res.status === HttpStatus.FORBIDDEN) {
        logger.error('bad oauth request (wrong consumer key, bad nonce, expired timestamp...).');
        throw new CustomError(res.status, res.statusText ?? res.message);
      }
      if (res.status === HttpStatus.TOO_MANY_REQUESTS) {
        logger.error('the app has exceeded its rate limits');
        throw new CustomError(res.status, res.statusText ?? res.message);
      }
      throw new CustomError(res.status, res.statusText ?? res.message);
    }
  };
}
