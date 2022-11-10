"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const errorSource_1 = require("../enums/errorSource");
const httpStatusCode_1 = require("../enums/httpStatusCode");
const base_error_1 = require("./base_error");
class ValidationError extends base_error_1.BaseError {
    constructor(message) {
        super(errorSource_1.ErrorSource.VALIDATION, message);
        this.statusCode = httpStatusCode_1.HttpStatusCode.BAD_REQUEST;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=validation_error.js.map