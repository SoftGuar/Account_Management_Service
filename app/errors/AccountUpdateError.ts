import { BaseError } from './BaseError';

export class AccountUpdateError extends BaseError {
    constructor(role: string, identifier: string | number, details?: any) {
      super(
        `Failed to update ${role} account with identifier '${identifier}'.`,
        'ACCOUNT_UPDATE_FAILED',
        500,
        details,
        'AccountService.update'
      );
    }
  }