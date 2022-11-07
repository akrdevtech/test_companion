import { ErrorSource } from '../enums/errorSource';
import { BaseError } from './base_error';

export class EventBridgeError extends BaseError {
  constructor(message: string, stack?: string) {
    super(ErrorSource.EVENT_BRIDGE, message, stack);
    Object.setPrototypeOf(this, EventBridgeError.prototype);
  }
}
