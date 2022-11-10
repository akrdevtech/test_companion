"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBridgeError = void 0;
const errorSource_1 = require("../enums/errorSource");
const base_error_1 = require("./base_error");
class EventBridgeError extends base_error_1.BaseError {
    constructor(message, stack) {
        super(errorSource_1.ErrorSource.EVENT_BRIDGE, message, stack);
        Object.setPrototypeOf(this, EventBridgeError.prototype);
    }
}
exports.EventBridgeError = EventBridgeError;
//# sourceMappingURL=eventbridge_error.js.map