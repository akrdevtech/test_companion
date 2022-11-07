import { ErrorSource } from '../enums/errorSource';
import { BaseError } from './base_error';

export class AWSBaseError extends BaseError {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(message: string, stack?: string, public readonly meta?: any) {
    super(ErrorSource.AWS, message, stack);
    Object.setPrototypeOf(this, AWSBaseError.prototype);
  }
}
