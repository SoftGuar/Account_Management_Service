import dotenv from 'dotenv';
import Fastify from 'fastify';
import registerMiddlewares from './middlewares';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import registerRoutes from './routers';
import { PrismaClient } from '@prisma/client';

// Load environment variables from .env
dotenv.config();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 2000;


// Ensure DATABASE_URL is available
// if (!process.env.DATABASE_URL) {
//   console.error('DATABASE_URL environment variable is not set');
//   process.exit(1);
// }



const fastify = Fastify({ logger: true });



// Initialize Prisma once at app startup
// const prisma = new PrismaClient();

// Check database connection
// async function checkDatabaseConnection() {
//   try {
//     await prisma.$connect();
//     console.log('Database connection established');
//   } catch (error) {
//     console.error('Failed to connect to database:', error);
//     process.exit(1);
//   }
// }

async function startServer() {
  // Check database connection first
  // await checkDatabaseConnection();
  
  // 1. Register middlewares
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
      host: host+":"+port,
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    },
    exposeRoute: true,
  });

  fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs'
  });

  fastify.register(registerRoutes);

  // 5. Start server
  try {
    await fastify.listen({ port, host });
    fastify.log.info(`Server started on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

// Add graceful shutdown
const gracefulShutdown = async () => {
  console.log('Shutting down gracefully');
  // await prisma.$disconnect();
  process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

startServer();
