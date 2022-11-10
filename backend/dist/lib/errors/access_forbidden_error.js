"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidArgumentError = void 0;
const errorSource_1 = require("../enums/errorSource");
const httpStatusCode_1 = require("../enums/httpStatusCode");
const base_error_1 = require("./base_error");
class InvalidArgumentError extends base_error_1.BaseError {
    constructor(message) {
        super(errorSource_1.ErrorSource.INTERNAL, message);
        this.statusCode = httpStatusCode_1.HttpStatusCode.FORBIDDEN;
        Object.setPrototypeOf(this, InvalidArgumentError.prototype);
    }
}
exports.InvalidArgumentError = InvalidArgumentError;
//# sourceMappingURL=access_forbidden_error.js.map