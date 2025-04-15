import { Type } from '@sinclair/typebox';
import { CommonErrorResponses } from '../baseSchema';

export const createAdminSchema = {
  tags: ['Admin'],
  body: Type.Object({
    first_name: Type.String(),
    last_name: Type.String(),
    email: Type.String({ format: 'email' }),
    password: Type.String(),
    phone: Type.Optional(Type.String()),
    privilege : Type.Number(),
    add_by: Type.Number(), 
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        first_name: Type.String(),
        last_name: Type.String(),
        email: Type.String({ format: 'email' }),
        phone: Type.Optional(Type.String()),
        privilege : Type.Number(),
        add_by: Type.Number(),
        created_at: Type.String({ format: 'date-time' }),
        updated_at: Type.String({ format: 'date-time' })


      })
    }),
    ...CommonErrorResponses,
  }
};

export const getAdminsSchema = {
  tags: ['Admin'],
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(
        Type.Object({
          id: Type.Number(),
          first_name: Type.String(),
          last_name: Type.String(),
          email: Type.String({ format: 'email' }),
          phone: Type.Optional(Type.String()),
          privilege : Type.Number(),
          add_by: Type.Number(),
          created_at: Type.String({ format: 'date-time' }),
          updated_at: Type.String({ format: 'date-time' })
  
  
        })
      )
    }),
    ...CommonErrorResponses,
  }
};

export const getAdminByIdSchema = {
  tags: ['Admin'],
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
        privilege : Type.Number(),
        add_by: Type.Number(),
        created_at: Type.String({ format: 'date-time' }),
        updated_at: Type.String({ format: 'date-time' })
      })
    }),
    ...CommonErrorResponses,
  }
};

export const updateAdminSchema = {
  tags: ['Admin'],
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Partial(
    Type.Object({
      first_name: Type.String(),
      last_name: Type.String(),
      email: Type.String({ format: 'email' }),
      password: Type.String(),
      phone: Type.Optional(Type.String()),
      privilege : Type.Optional(Type.Number()),
    })
  ),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        first_name: Type.String(),
        last_name: Type.String(),
        email: Type.String({ format: 'email' }),
        phone: Type.Optional(Type.String()),
        privilege : Type.Number(),
        add_by: Type.Number(),
        created_at: Type.String({ format: 'date-time' }),
        updated_at: Type.String({ format: 'date-time' })


      })
    }),
    ...CommonErrorResponses,
  }
};

export const deleteAdminSchema = {
  tags: ['Admin'],
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      message: Type.String()
    }),
    ...CommonErrorResponses,
  }
};
