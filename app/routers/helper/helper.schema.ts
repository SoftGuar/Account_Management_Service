import { Type } from '@sinclair/typebox';

export const createHelperSchema = {
  tags: ['Helper'],
  body: Type.Object({
    first_name: Type.String(),
    last_name: Type.String(),
    email: Type.String({ format: 'email' }),
    password: Type.String(),
    phone: Type.Optional(Type.String()),
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
      })
    })
  }
};

export const getHelpersSchema = {
  tags: ['Helper'],
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
        })
      )
    })
  }
};

export const getHelperByIdSchema = {
  tags: ['Helper'],
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
      })
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const updateHelperSchema = {
  tags: ['Helper'],
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
      })
    })
  }
};

export const deleteHelperSchema = {
  tags: ['Helper'],
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      message: Type.String()
    })
  }
};
