import { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import errorHandler from './errorHandlerMiddleware';

const registerMiddlewares = (fastify: FastifyInstance) => {
  fastify.register(fastifyCors, {
    origin: '*',
  });

  errorHandler(fastify);

};

export default registerMiddlewares;