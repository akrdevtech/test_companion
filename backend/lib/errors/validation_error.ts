import { ErrorSource } from '../enums/errorSource';
import { HttpStatusCode } from '../enums/httpStatusCode';
import { BaseError } from './base_error';

export class ValidationError extends BaseError {
  constructor(message: string) {
    super(ErrorSource.VALIDATION, message);
    this.statusCode = HttpStatusCode.BAD_REQUEST;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
