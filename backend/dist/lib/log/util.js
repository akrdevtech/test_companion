"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appLogger = exports.logDebug = exports.logWarn = exports.logError = exports.logInfo = exports.getAuditLogMiddleware = void 0;
const lib_audit_logger_1 = require("@akrdevtech/lib-audit-logger");
const config_1 = require("../config");
const loggerConfig = config_1.ConfigManager.getLoggerConfig();
const logger = (0, lib_audit_logger_1.getLogger)(loggerConfig);
const getAuditLogMiddleware = () => (0, lib_audit_logger_1.getAuditLogMiddleware)(loggerConfig);
exports.getAuditLogMiddleware = getAuditLogMiddleware;
function logInfo(message, ...meta) {
    logger.info(message, meta);
}
exports.logInfo = logInfo;
function logError(message, ...err) {
    logger.error(message, err);
}
exports.logError = logError;
function logWarn(message) {
    logger.warn(message);
}
exports.logWarn = logWarn;
function logDebug(message) {
    logger.debug(message);
}
exports.logDebug = logDebug;
exports.appLogger = {
    logInfo,
    logError,
    logWarn,
    logDebug,
};
//# sourceMappingURL=util.js.map