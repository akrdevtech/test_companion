import config from 'config';
import { VENDOR } from './enums/vendor';
import { ConfigurationError } from './errors/config_error';

export interface IMongoConfig {
    uri: string;
    dbName: string;
    ssl: boolean;
    logLevel: string;
}

export interface IEnvConfig {
    name: string;
    port: string;
    apiBaseUrl: string;
    serviceName: string;
    accessAllowedFrom: string[];
    openEndpoints: string[];
    lockedEndpoints: string[];
    internalApiKey: string;
    auditLogExcludedPaths: string[];
}

export interface ILoggerConfig {
    name: string;
    serviceName: string;
    auditLogExcludedPaths: string[];
}

export interface IAppConfig {
    envConfig: IEnvConfig;
    mongoConfig: IMongoConfig,
}

interface IConfigProperties {
    [key: string]: string;
}

type TVendorConfig = IMongoConfig;

export class ConfigManager {
    private static isStringArray(array: Array<string>): boolean {
        return Array.isArray(array) && array.filter((item) => typeof item !== 'string').length === 0;
    }

    public static getLoggerConfig(): ILoggerConfig {
        const auditLogExcludedPaths = config.get('Environment.auditLogExcludedPaths') as string[];
        const { name, serviceName } = config.get('Environment') as IConfigProperties;

        if (!name || !serviceName) {
            throw new ConfigurationError('Please add all required configuration for the environment');
        }

        const loggerConfig = {
            name,
            serviceName,
            auditLogExcludedPaths,
        };

        return loggerConfig;
    }

    public static getEnvConfig(): IEnvConfig {
        const accessAllowedFrom = config.get('Environment.accessAllowedFrom') as string[];
        const openEndpoints = config.get('Environment.openEndpoints') as string[];
        const lockedEndpoints = config.get('Environment.lockedEndpoints') as string[];
        const auditLogExcludedPaths = config.get('Environment.auditLogExcludedPaths') as string[];
        const port = config.get('Environment.port') as number;

        if (!this.isStringArray(accessAllowedFrom)) {
            throw new ConfigurationError('Environment -> accessAllowedFrom should be string array');
        }

        const {
            name,
            apiBaseUrl,
            serviceName,
            internalApiKey,
        } = config.get('Environment') as IConfigProperties;

        if (!name || !apiBaseUrl || !serviceName) {
            throw new ConfigurationError('Please add all required configuration for the environment');
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

    private static getVendorConfig(vendor: VENDOR): TVendorConfig {
        switch (vendor) {
            case VENDOR.MONGO: {
                const {
                    uri,
                    dbName,
                    ssl = false,
                    logLevel = 'info',
                } = config.get('Services.mongo') as IConfigProperties;
                if (!uri || !dbName || !logLevel) {
                    throw new ConfigurationError(`Please add all required configuration for vendor: ${vendor}`);
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
    public static getAppConfig(): IAppConfig {
        // All application configurations should go here
        return {
            envConfig: this.getEnvConfig() as IEnvConfig,
            mongoConfig: this.getVendorConfig(VENDOR.MONGO) as IMongoConfig,
        };
    }
}