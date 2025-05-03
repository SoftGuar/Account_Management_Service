import { Type } from '@sinclair/typebox';
import { CommonErrorResponses } from '../baseSchema';

export const getSuperAdminByIdSchema = {
  tags: ['SuperAdmin'],
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        first_name: Type.String(),
        last_name: Type.String(),
        email: Type.String({ format: 'email' }),
        phone: Type.Optional(Type.String()),
        created_at: Type.String({ format: 'date-time' }),
        updated_at: Type.String({ format: 'date-time' })
      })
    }),
    ...CommonErrorResponses,
  }
};