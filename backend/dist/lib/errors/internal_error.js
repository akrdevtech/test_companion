"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = void 0;
const errorSource_1 = require("../enums/errorSource");
const httpStatusCode_1 = require("../enums/httpStatusCode");
const base_error_1 = require("./base_error");
class InternalError extends base_error_1.BaseError {
    constructor(message, statusCode, stack) {
        super(errorSource_1.ErrorSource.INTERNAL, message, stack);
        this.statusCode = statusCode || httpStatusCode_1.HttpStatusCode.INTERNAL_SERVER_ERROR;
        Object.setPrototypeOf(this, InternalError.prototype);
    }
}
exports.InternalError = InternalError;
//# sourceMappingURL=internal_error.js.map