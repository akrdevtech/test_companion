"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const errorSource_1 = require("../enums/errorSource");
const httpStatusCode_1 = require("../enums/httpStatusCode");
const base_error_1 = require("./base_error");
class NotFoundError extends base_error_1.BaseError {
    constructor(message) {
        super(errorSource_1.ErrorSource.NOT_FOUND, message);
        this.statusCode = httpStatusCode_1.HttpStatusCode.BAD_REQUEST;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=not_found_error.js.map