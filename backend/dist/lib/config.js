"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigManager = void 0;
const config_1 = __importDefault(require("config"));
const config_error_1 = require("./errors/config_error");
class ConfigManager {
    static isStringArray(array) {
        return Array.isArray(array) && array.filter((item) => typeof item !== 'string').length === 0;
    }
    static getDbConfig() {
        const { USER, PASSWORD, DB, HOST } = config_1.default.get('Services.dbService');
        if (!DB || !HOST) {
            throw new config_error_1.ConfigurationError('Please add all required configuration for the environment');
        }
        const dbConfig = { DB, USER, PASSWORD, OPTIONS: { HOST } };
        return dbConfig;
    }
    static getLoggerConfig() {
        const auditLogExcludedPaths = config_1.default.get('Environment.auditLogExcludedPaths');
        const { name, serviceName } = config_1.default.get('Environment');
        if (!name || !serviceName) {
            throw new config_error_1.ConfigurationError('Please add all required configuration for the environment');
        }
        const loggerConfig = {
            name,
            serviceName,
            auditLogExcludedPaths,
        };
        return loggerConfig;
    }
    static getEnvConfig() {
        const accessAllowedFrom = config_1.default.get('Environment.accessAllowedFrom');
        const openEndpoints = config_1.default.get('Environment.openEndpoints');
        const lockedEndpoints = config_1.default.get('Environment.lockedEndpoints');
        const auditLogExcludedPaths = config_1.default.get('Environment.auditLogExcludedPaths');
        const port = config_1.default.get('Environment.port');
        if (!this.isStringArray(accessAllowedFrom)) {
            throw new config_error_1.ConfigurationError('Environment -> accessAllowedFrom should be string array');
        }
        const { name, apiBaseUrl, serviceName, internalApiKey, } = config_1.default.get('Environment');
        if (!name || !apiBaseUrl || !serviceName) {
            throw new config_error_1.ConfigurationError('Please add all required configuration for the environment');
        }
        const envConfig = {
            name,
            port: port.toString(),
            accessAllowedFrom,
            apiBaseUrl,
            serviceName,
            internalApiKey,
            openEndpoints,
            lockedEndpoints,
            auditLogExcludedPaths
        };
        return envConfig;
    }
    static getAppConfig() {
        // All application configurations should go here
        return {
            envConfig: this.getEnvConfig(),
            dbConfig: this.getDbConfig(),
        };
    }
}
exports.ConfigManager = ConfigManager;
//# sourceMappingURL=config.js.map