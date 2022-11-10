"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
const httpStatusCode_1 = require("../enums/httpStatusCode");
class BaseError extends Error {
    constructor(errorSource, message, stack) {
        super(message);
        this.appErr = true;
        Object.setPrototypeOf(this, BaseError.prototype);
        this.source = errorSource;
        this.statusCode = httpStatusCode_1.HttpStatusCode.INTERNAL_SERVER_ERROR;
        if (stack) {
            this.stack = stack;
        }
    }
}
exports.BaseError = BaseError;
//# sourceMappingURL=base_error.js.map