import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import logger from '../utils/logger/logger';

export default function requestLoggerMiddleware(fastify: FastifyInstance) {
  // Store the start time and request details on the request object
  fastify.addHook('onRequest', (request: FastifyRequest, reply: FastifyReply, done) => {
    // Store the start time
    (request as any).requestStartTime = process.hrtime();
    
    // Store request details
    (request as any).requestDetails = {
      method: request.method,
      url: request.url,
      ip: request.ip,
      headers: request.headers,
      params: request.params,
      query: request.query
    };
    
    done();
  });
  
  // Capture the body after parsing but don't log yet
  fastify.addHook('preHandler', (request: FastifyRequest, reply: FastifyReply, done) => {
    if (request.body) {
      (request as any).requestDetails.body = sanitizeBody(request.body);
    }
    
    done();
  });

  // Log everything in a single entry when the response is being sent
  fastify.addHook('onSend', (request: FastifyRequest, reply: FastifyReply, payload, done) => {
    const startTime = (request as any).requestStartTime;
    const hrTime = process.hrtime(startTime);
    const responseTime = hrTime[0] * 1000 + hrTime[1] / 1000000;
    
    const requestDetails = (request as any).requestDetails || {};
    
    logger.info({
      ...requestDetails,
      statusCode: reply.statusCode,
      responseTime: `${responseTime.toFixed(2)}ms`,
      // Optionally add response body if needed (consider sanitizing sensitive responses)
      // responseBody: sanitizeBody(JSON.parse(payload?.toString() || '{}')),
    }, 'Request completed');
    
    done();
  });
}

// Helper function to sanitize sensitive information
function sanitizeBody(body: any): any {
  if (!body) return body;
  
  const sanitized = JSON.parse(JSON.stringify(body));
  const sensitiveFields = ['password', 'token', 'secret', 'creditCard', 'ssn'];
  
  const sanitizeObject = (obj: any) => {
    if (typeof obj !== 'object' || obj === null) return;
    
    Object.keys(obj).forEach(key => {
      if (sensitiveFields.includes(key.toLowerCase())) {
        obj[key] = '[REDACTED]';
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitizeObject(obj[key]);
      }
    });
  };
  
  sanitizeObject(sanitized);
  return sanitized;
}