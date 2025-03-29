import dotenv from 'dotenv';
import Fastify from 'fastify';
import registerMiddlewares from './middlewares';
import registerRoutes from './routers';
import logger from './utils/logger/logger';
import { checkDatabaseConnection, disconnectPrisma } from './services/prismaService';
import pino from 'pino';
import { destination as logDestination } from './utils/logger/streams'; // <-- Add this import
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

// Load environment variables
dotenv.config();

const isProd = process.env.ENV ? (process.env.ENV === 'PROD') : false;

const host = process.env.HOST || 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const domain = process.env.DOMAIN || host+':'+port;

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

// Use your custom logger when creating Fastify instance
const fastify = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'debug',
    stream: logDestination,
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level(label) {
        return { level: label };
      },
    },
  },
});


async function startServer() {
  await checkDatabaseConnection();
  registerMiddlewares(fastify);
    // 2. Register Swagger plugin (generates the OpenAPI JSON/YAML endpoints)
    fastify.register(fastifySwagger as any, {
      swagger: {
        info: {
          title: 'My API',
          description: 'API Documentation generated with Fastify Swagger',
          version: '1.0.0'
        },
        externalDocs: {
          url: 'https://swagger.io',
          description: 'Find more info here'
        },
        host: domain,
        schemes: isProd ? ['https'] : ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
      },
      exposeRoute: true,
    });
  
    fastify.register(fastifySwaggerUi, {
      routePrefix: '/docs'
    });
  registerRoutes(fastify);

  try {
    const port = Number(process.env.PORT) || 3000;
    const host = process.env.HOST || '0.0.0.0';
    await fastify.listen({ port, host });
    fastify.log.info(`Server started on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

const gracefulShutdown = async () => {
  console.log('Shutting down gracefully');
  await disconnectPrisma();
  process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

startServer();