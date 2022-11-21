import { getAuditLogMiddleware as auditLog, getLogger, ILoggerConfig } from '@akrdevtech/lib-audit-logger';
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

export enum ELogTypes {
  INFO = 'info',
  ERROR = 'error',
  WARN = 'warn',
  DEBUG = 'debug',
}

export function logMessage(type: ELogTypes, moduleName: string, message: string, ...err: Record<string, unknown>[]) {
  const thisMessage = `[${moduleName}] : ${message}`;
  switch (type) {
    case ELogTypes.INFO: logInfo(thisMessage); break;
    case ELogTypes.WARN: logWarn(thisMessage); break;
    case ELogTypes.DEBUG: logDebug(thisMessage); break;
    case ELogTypes.ERROR: logError(thisMessage, ...err); break;
    default: logInfo(thisMessage); break;
  }
}

export const appLogger = {
  logInfo,
  logError,
  logWarn,
  logDebug,
  logMessage,
  ELogTypes,
}
