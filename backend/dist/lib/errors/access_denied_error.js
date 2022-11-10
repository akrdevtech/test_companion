"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessDeniedError = void 0;
const errorSource_1 = require("../enums/errorSource");
const httpStatusCode_1 = require("../enums/httpStatusCode");
const base_error_1 = require("./base_error");
class AccessDeniedError extends base_error_1.BaseError {
    constructor(message) {
        super(errorSource_1.ErrorSource.INTERNAL, message);
        this.statusCode = httpStatusCode_1.HttpStatusCode.UNAUTHORIZED;
        Object.setPrototypeOf(this, AccessDeniedError.prototype);
    }
}
exports.AccessDeniedError = AccessDeniedError;
//# sourceMappingURL=access_denied_error.js.map