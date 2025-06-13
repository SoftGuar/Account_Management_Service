import { Type } from '@sinclair/typebox';

export const addUserActionSchema = {
  tags: ['UserAction'],
  body: Type.Object({
    userId: Type.Number(),
    action: Type.String(),
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        user_id: Type.Number(),
        action: Type.String(),
        createdAt: Type.String({ format: 'date-time' }),
      }),
    }),
    500: Type.Object({
      success: Type.Literal(false),
      error: Type.Object({
        message: Type.String(),
        code: Type.String(),
        timestamp: Type.String({ format: 'date-time' }),
      }),
    }),
  },
};