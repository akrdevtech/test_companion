"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationError = void 0;
const errorSource_1 = require("../enums/errorSource");
const base_error_1 = require("./base_error");
class ConfigurationError extends base_error_1.BaseError {
    constructor(message) {
        super(errorSource_1.ErrorSource.CONFIGURATION, message);
        Object.setPrototypeOf(this, ConfigurationError.prototype);
    }
}
exports.ConfigurationError = ConfigurationError;
//# sourceMappingURL=config_error.js.map