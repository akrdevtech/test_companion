"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSBaseError = void 0;
const errorSource_1 = require("../enums/errorSource");
const base_error_1 = require("./base_error");
class AWSBaseError extends base_error_1.BaseError {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(message, stack, meta) {
        super(errorSource_1.ErrorSource.AWS, message, stack);
        this.meta = meta;
        Object.setPrototypeOf(this, AWSBaseError.prototype);
    }
}
exports.AWSBaseError = AWSBaseError;
//# sourceMappingURL=aws_error.js.map