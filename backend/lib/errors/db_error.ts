import { ErrorSource } from '../enums/errorSource';
import { BaseError } from './base_error';

export class DatabaseError extends BaseError {
  constructor(message: string, stack?: string) {
    super(ErrorSource.DB, message, stack);
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}
