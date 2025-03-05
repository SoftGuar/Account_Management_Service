import { FastifyReply, FastifyRequest } from 'fastify';

// Interface pour typer la requête avec un utilisateur
interface AuthenticatedRequest extends FastifyRequest {
  user?: {
    id: string;
    role: string;
  };
}

export const isSuperAdmin = async (request: AuthenticatedRequest, reply: FastifyReply) => {
  try {
    // Vérifie si l'utilisateur est bien authentifié
    if (!request.user) {
      return reply.code(401).send({
        success: false,
        message: 'Unauthorized. Please log in.'
      });
    }

    // Vérifie si l'utilisateur est un superadmin
    if (request.user.role !== 'superadmin') {
      return reply.code(403).send({
        success: false,
        message: 'Access denied. Superadmin only.'
      });
    }
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: 'Internal server error'
    });
  }
};
