import moment from 'moment-timezone';
import morgan from 'morgan';
import { createLogger, format, Logger, transports } from 'winston';

const { combine, label, printf, prettyPrint, colorize } = format;

const LOGGING_TZ = 'Asia/Kolkata';

export function getLogger(loggerConfig: ILoggerConfig): Logger {
  const options = {
    local: {
      format: combine(
        label({
          label: loggerConfig.serviceName as string,
        }),
        format.splat(),
        prettyPrint(),
        colorize(),
        printf((log) => `${moment().tz(LOGGING_TZ).format()} [${log.label}] ${log.level}: ${log.message}\n`),
      )
      // TODO:  Investigate -- some error objects and stack trace is not displayed
    },
    server: {
      format: combine(
        label({
          label: loggerConfig.serviceName as string,
        }),
        format.splat(),
        prettyPrint(),
        printf((log) => `${moment().tz(LOGGING_TZ).format()} [${log.label}] ${log.level}: ${log.message}\n`),
      ),
      // TODO:  Investigate -- some error objects and stack trace is not displayed
    },
  };

  return createLogger({
    level: process.env.LOG_LEVEL || 'info',
    transports: [new transports.Console(loggerConfig.name !== 'local' ? options.server : options.local)],
    exceptionHandlers: [new transports.Console(loggerConfig.name !== 'local' ? options.server : options.local)],
    exitOnError: false,
  });
}

export function getAuditLogMiddleware(loggerConfig: ILoggerConfig): any {
  morgan.token('txId', (req: any) => req.txId); // Defined transactionId token
  morgan.token('ts', (req, res, tz: any) => moment().tz(tz).format()); // Define timestamp token
  const auditFormat = (tokens: morgan.TokenIndexer, req: any, res: any) => {
    return [
      tokens.ts(req, res, LOGGING_TZ),
      '[' + loggerConfig.serviceName + ']',
      'audit:',
      '[transactionId]',
      tokens.txId(req, res),
      '[HTTP METHOD]',
      tokens.method(req, res),
      '[URL]',
      tokens.url(req, res),
      '[STATUS]',
      tokens.status(req, res),
      '[BODY]',
      JSON.stringify(req.body),
      '[CONTENT LENGTH]',
      tokens.res(req, res, 'content-length'),
      '-',
      '[Time Taken]',
      tokens['response-time'](req, res),
      'ms'
    ].join(' ');
  };

  return morgan(auditFormat, {
    skip: (req) => loggerConfig.auditLogExcludedPaths.includes(req.url)
  });
}
export interface ILoggerConfig {
  name: string;
  serviceName: string;
  auditLogExcludedPaths: string[];
}