export class CustomError extends Error {
  public readonly status: number;
  public readonly message: string;
  public readonly stack?: string;

  constructor(status: number, message: string) {
    super(message);

    this.status = status;
    this.message = message;
    this.stack = new Error().stack;
  }

  public static isCustomError = (error: unknown): error is CustomError => {
    return error instanceof CustomError;
  };
}
