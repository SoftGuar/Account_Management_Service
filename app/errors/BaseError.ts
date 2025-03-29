import { Type } from '@sinclair/typebox';


export class BaseError extends Error {
    public readonly success: boolean;
    public readonly statusCode: number;
    public readonly errorCode: string;
    public readonly details?: any;         // Optional extra information
    public readonly timestamp: string;     // Error occurrence timestamp
    public readonly context?: string;      // Context (optional, e.g., method/service name)
    public readonly isOperational: boolean; // Distinguishes operational vs programming errors
  
    constructor(
      message: string,
      errorCode = 'GENERIC_ERROR',
      statusCode = 500,
      details?: any,
      context?: string,
      isOperational = true
    ) {
      super(message);
      this.success = false;
      this.errorCode = errorCode;
      this.statusCode = statusCode;
      this.details = details;
      this.context = context;
      this.isOperational = isOperational;
      this.timestamp = new Date().toISOString();
  
      Object.setPrototypeOf(this, new.target.prototype);
      Error.captureStackTrace(this);
    }
  
    // Serialize for Gateway API response
    toJSON() {
      return {
        success: this.success,
        error: {
          message: this.message,
          code: this.errorCode,
          statusCode: this.statusCode,
          timestamp: this.timestamp,
          context: this.context,
          details: this.details,
        },
      };
    }

    static getErrorResponseSchema() {
        return {
            type: 'object',
            properties: {
            success: { type: 'boolean' },
            error: {
                type: 'object',
                properties: {
                message: { type: 'string' },
                code: { type: 'string' },
                statusCode: { type: 'number' },
                timestamp: { type: 'string' },
                context: { type: 'string' },
                details: { type: 'object' },
                },
            },
            },
        };
        }
  }
  