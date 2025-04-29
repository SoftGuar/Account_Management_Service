import { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import errorHandler from './errorHandlerMiddleware';
import requestLoggerMiddleware from './RequestLoggerMiddleware';

const registerMiddlewares = (fastify: FastifyInstance) => {


  requestLoggerMiddleware(fastify);

  errorHandler(fastify);  
  fastify.register(fastifyCors, {
    origin: '*',
  });

};

export default registerMiddlewares;