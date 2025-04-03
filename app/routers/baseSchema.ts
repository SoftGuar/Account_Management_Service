import { Type } from '@sinclair/typebox';
import { BaseError } from '../errors/BaseError';

export const CommonErrorResponses = {
  400: BaseError.getErrorResponseSchema(),
  404: BaseError.getErrorResponseSchema(),
  500: BaseError.getErrorResponseSchema(),
};