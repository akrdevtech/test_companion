import { getAuditLogMiddleware as auditLog, getLogger, ILoggerConfig } from '../supportLibs/logger';
import { ConfigManager } from '../config';

const loggerConfig: ILoggerConfig = ConfigManager.getLoggerConfig();
const logger = getLogger(loggerConfig);

export const getAuditLogMiddleware = () => auditLog(loggerConfig);

export function logInfo(message: string, ...meta: Record<string, unknown>[]): void {
  logger.info(message, meta);
}

export function logError(message: string, ...err: Record<string, unknown>[]): void {
  logger.error(message, err);
}

export function logWarn(message: string): void {
  logger.warn(message);
}

export function logDebug(message: string): void {
  logger.debug(message);
}
