import { BaseError } from './BaseError';

export class AccountCreationError extends BaseError {
    constructor(role: string, details?: any) {
      super(
        `Failed to create ${role} account due to internal error.`,
        'ACCOUNT_CREATION_FAILED',
        500,
        details,
        'AccountService.create'
      );
    }
  }