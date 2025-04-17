// routes/schemas/helperRecommendation.schema.ts
import { Type } from '@sinclair/typebox';
import { CommonErrorResponses } from '../baseSchema';

const HelperRecommendationObject = Type.Object({
  id: Type.Number(),
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: 'email' }),
  phone: Type.Optional(Type.String()),
  status: Type.String(),
  notes: Type.Optional(Type.String()),
  user_id: Type.Number(),
  created_at: Type.String({ format: 'date-time' }),
  updated_at: Type.String({ format: 'date-time' })
});

export const createHelperRecommendationSchema = {
  tags: ['Helper Recommendations'],
  body: Type.Object({
    first_name: Type.String(),
    last_name: Type.String(),
    email: Type.String({ format: 'email' }),
    phone: Type.Optional(Type.String()),
    user_id: Type.Number(),
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: HelperRecommendationObject
    }),
    ...CommonErrorResponses,
  }
};

export const getHelperRecommendationsSchema = {
  tags: ['Helper Recommendations'],
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(HelperRecommendationObject)
    }),
    ...CommonErrorResponses,
  }
};

export const getHelperRecommendationByIdSchema = {
  tags: ['Helper Recommendations'],
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: HelperRecommendationObject
    }),
    ...CommonErrorResponses,
  }
};

export const approveHelperRecommendationSchema = {
  tags: ['Helper Recommendations'],
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Object({
    password: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        helper: Type.Object({
          id: Type.Number(),
          first_name: Type.String(),
          last_name: Type.String(),
          email: Type.String({ format: 'email' }),
          phone: Type.Optional(Type.String()),
          created_at: Type.String({ format: 'date-time' }),
          updated_at: Type.String({ format: 'date-time' })
        }),
        recommendation: HelperRecommendationObject
      }),
      message: Type.String()
    }),
    ...CommonErrorResponses,
  }
};

export const rejectHelperRecommendationSchema = {
  tags: ['Helper Recommendations'],
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Object({
    notes: Type.Optional(Type.String())
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: HelperRecommendationObject,
      message: Type.String()
    }),
    ...CommonErrorResponses,
  }
};

export const deleteHelperRecommendationSchema = {
  tags: ['Helper Recommendations'],
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