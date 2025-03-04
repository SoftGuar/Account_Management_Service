
import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export const validateDtoMiddleware = (dtoClass: any, source: 'body' | 'params' | 'query') => {
  return async (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
    try {
      const data = request[source]; // Get data from body, params, or query
      const instance = plainToInstance(dtoClass, data);
      const errors = await validate(instance as object);

      if (errors.length > 0) {
        return reply.code(400).send({
          success: false,
          message: errors
            .map(err => Object.values(err.constraints || {}).join(', '))
            .join('; ')
        });
      }

      // Attach validated data to request
      request[source] = instance;
      done();
    } catch (error) {
      return reply.code(500).send({
        success: false,
        message: 'Validation middleware encountered an error'
      });
    }
  };
};
