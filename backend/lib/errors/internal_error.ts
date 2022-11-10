import { ErrorSource } from '../enums/errorSource';
import { HttpStatusCode } from '../enums/httpStatusCode';
import { BaseError } from './base_error';

export class InternalError extends BaseError {
  constructor(message: string, statusCode: number, stack?: string) {
    super(ErrorSource.INTERNAL, message, stack);
    this.statusCode = statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
    Object.setPrototypeOf(this, InternalError.prototype);
  }
}
