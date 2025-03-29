import { BaseError } from './BaseError';

export class AccountFetchError extends BaseError {
    constructor(role: string, identifier?: string | number, details?: any) {
      super(
        identifier
          ? `Failed to fetch ${role} account with identifier '${identifier}'.`
          : `Failed to fetch ${role} accounts.`,
        'ACCOUNT_FETCH_FAILED',
        500,
        details,
        'AccountService.fetch'
      );
    }
  }