export class BaseError extends Error {
    public readonly statusCode: number;
    public readonly errorCode: string;
  
    constructor(message: string, errorCode = 'GENERIC_ERROR', statusCode = 500) {
      super(message);
      this.errorCode = errorCode;
      this.statusCode = statusCode;
      Object.setPrototypeOf(this, new.target.prototype);
      Error.captureStackTrace(this);
    }
  }