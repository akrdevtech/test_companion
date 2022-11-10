"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const errorSource_1 = require("../enums/errorSource");
const httpStatusCode_1 = require("../enums/httpStatusCode");
const base_error_1 = require("./base_error");
class RequestValidationError extends base_error_1.BaseError {
    constructor(errors) {
        super(errorSource_1.ErrorSource.VALIDATION, 'Bad Request');
        this.statusCode = httpStatusCode_1.HttpStatusCode.BAD_REQUEST;
        this.errors = errors;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
}
exports.RequestValidationError = RequestValidationError;
//# sourceMappingURL=request_validation_error.js.map