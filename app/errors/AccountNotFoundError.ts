import { BaseError } from './BaseError';

export class AccountNotFoundError extends BaseError {
    constructor(role: string, identifier: string | number) {
      super(
        `${role} account with identifier '${identifier}' not found.`,
        'ACCOUNT_NOT_FOUND',
        404,
        { role, identifier },
        'AccountService'
      );
    }
  }