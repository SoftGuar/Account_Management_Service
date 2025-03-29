import { FastifyInstance, FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { BaseError } from '../errors/BaseError';
import logger from '../utils/logger/logger';

export default function errorHandler(fastify: FastifyInstance) {
  fastify.setErrorHandler(
    (error: FastifyError | BaseError, request: FastifyRequest, reply: FastifyReply) => {
      // Determine log level: warn for client errors, error for server errors
      const logLevel = (error instanceof BaseError && error.statusCode < 500) ? 'warn' : 'error';

      logger[logLevel]({
        error: {
          message: error.message,
          stack: error.stack,
          ...(error instanceof BaseError && {
            code: error.errorCode,
            details: error.details,
            context: error.context,
          }),
        },
        request: {
          method: request.method,
          url: request.url,
          params: request.params,
          query: request.query,
        },
      }, 'Unhandled error caught by Fastify');

      if (error instanceof BaseError) {
        reply.code(error.statusCode).send(error.toJSON());
      } else {
        reply.status(500).send({
          success: false,
          error: {
            message: 'Internal Server Error',
            code: 'INTERNAL_SERVER_ERROR',
            details: {},
            timestamp: new Date().toISOString(),
          },
        });
      }
    }
  );
}