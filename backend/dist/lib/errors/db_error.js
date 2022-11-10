"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = void 0;
const errorSource_1 = require("../enums/errorSource");
const base_error_1 = require("./base_error");
class DatabaseError extends base_error_1.BaseError {
    constructor(message, stack) {
        super(errorSource_1.ErrorSource.DB, message, stack);
        Object.setPrototypeOf(this, DatabaseError.prototype);
    }
}
exports.DatabaseError = DatabaseError;
//# sourceMappingURL=db_error.js.map