import { BaseError } from './BaseError';

// General Account Errors (applicable for Admin, User, Manager, etc.)

export class AccountAlreadyExistsError extends BaseError {
  constructor(role: string, identifier: string | number) {
    super(
      `${role} account with identifier '${identifier}' already exists.`,
      'ACCOUNT_ALREADY_EXISTS',
      409,
      { role, identifier },
      'AccountService.create'
    );
  }
}
