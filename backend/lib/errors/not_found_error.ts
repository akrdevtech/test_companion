import { ErrorSource } from '../enums/errorSource';
import { HttpStatusCode } from '../enums/httpStatusCode';
import { BaseError } from './base_error';

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(ErrorSource.NOT_FOUND, message);
    this.statusCode = HttpStatusCode.BAD_REQUEST;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
