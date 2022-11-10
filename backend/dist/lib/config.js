"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigManager = void 0;
const config_1 = __importDefault(require("config"));
const vendor_1 = require("./enums/vendor");
const config_error_1 = require("./errors/config_error");
class ConfigManager {
    static isStringArray(array) {
        return Array.isArray(array) && array.filter((item) => typeof item !== 'string').length === 0;
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
    static getVendorConfig(vendor) {
        switch (vendor) {
            case vendor_1.VENDOR.MONGO: {
                const { uri, dbName, ssl = false, logLevel = 'info', } = config_1.default.get('Services.mongo');
                if (!uri || !dbName || !logLevel) {
                    throw new config_error_1.ConfigurationError(`Please add all required configuration for vendor: ${vendor}`);
                }
                const mongoConfig = {
                    uri,
                    dbName,
                    ssl: Boolean(ssl),
                    logLevel,
                };
                return mongoConfig;
            }
        }
    }
    static getAppConfig() {
        // All application configurations should go here
        return {
            envConfig: this.getEnvConfig(),
            mongoConfig: this.getVendorConfig(vendor_1.VENDOR.MONGO),
        };
    }
}
exports.ConfigManager = ConfigManager;
//# sourceMappingURL=config.js.map