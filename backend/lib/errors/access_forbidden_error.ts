import { ErrorSource } from '../enums/errorSource';
import { HttpStatusCode } from '../enums/httpStatusCode';
import { BaseError } from './base_error';

export class InvalidArgumentError extends BaseError {
  constructor(message: string) {
    super(ErrorSource.INTERNAL, message);
    this.statusCode = HttpStatusCode.FORBIDDEN;
    Object.setPrototypeOf(this, InvalidArgumentError.prototype);
  }
}
