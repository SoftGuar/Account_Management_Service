import { BaseError } from './BaseError';

export class AccountDeletionError extends BaseError {
    constructor(role: string, identifier: string | number, details?: any) {
      super(
        `Failed to delete ${role} account with identifier '${identifier}'.`,
        'ACCOUNT_DELETION_FAILED',
        500,
        details,
        'AccountService.delete'
      );
    }
  }