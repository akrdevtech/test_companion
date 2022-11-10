import { ErrorSource } from '../enums/errorSource';
import { HttpStatusCode } from '../enums/httpStatusCode';
import { BaseError } from './base_error';

export class RequestValidationError extends BaseError {
  constructor(errors: Record<string, unknown>[]) {
    super(ErrorSource.VALIDATION, 'Bad Request');
    this.statusCode = HttpStatusCode.BAD_REQUEST;
    this.errors = errors;
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
