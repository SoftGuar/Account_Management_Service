// app/routes/api/user.schema.ts
import { Type } from '@sinclair/typebox';
import { CommonErrorResponses } from '../baseSchema';

// Définir les schémas de validation en utilisant TypeBox directement
// au lieu de faire référence aux interfaces du modèle
const HelperType = Type.Object({

  id: Type.Number(),
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: 'email' }),
  phone: Type.Optional(Type.String()),
});

const UserType = Type.Object({
  id: Type.Number(),
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: 'email' }),
  phone: Type.Optional(Type.String()),
});

const UserWithHelpersType = Type.Object({
  id: Type.Number(),
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: 'email' }),
  phone: Type.Optional(Type.String()),
  helpers: Type.Optional(Type.Array(HelperType))
});

export const createUserSchema = {
  tags: ['User'],
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
      data: UserType
    }),
    ...CommonErrorResponses,
  }
};

export const getUsersSchema = {
  tags: ['User'],
};

export const getUserByIdSchema = {
  tags: ['User'],
  params: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: UserType,
    }),
    ...CommonErrorResponses,
  },
};

export const updateUserSchema = {
  tags: ['User'],
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
      data: UserType
    }),
    ...CommonErrorResponses,
  }
};

export const deleteUserSchema = {
  tags: ['User'],
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

export const getUserHelpersSchema = {
  tags: ['User'],
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(HelperType)
    }),
    ...CommonErrorResponses,
  }
};

export const addHelperToUserSchema = {
  tags: ['User'],
  params: Type.Object({
    id: Type.String(),
    helperId: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: UserWithHelpersType
    }),
    ...CommonErrorResponses,
  }
};

export const removeHelperFromUserSchema = {
  tags: ['User'],
  params: Type.Object({
    id: Type.String(),
    helperId: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: UserWithHelpersType
    }),
    ...CommonErrorResponses,
  }
};