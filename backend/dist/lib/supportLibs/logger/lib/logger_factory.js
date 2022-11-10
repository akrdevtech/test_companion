"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuditLogMiddleware = exports.getLogger = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const morgan_1 = __importDefault(require("morgan"));
const winston_1 = require("winston");
const { combine, label, printf, prettyPrint, colorize } = winston_1.format;
const LOGGING_TZ = 'Asia/Kolkata';
function getLogger(loggerConfig) {
    const options = {
        local: {
            format: combine(label({
                label: loggerConfig.serviceName,
            }), winston_1.format.splat(), prettyPrint(), colorize(), printf((log) => `${(0, moment_timezone_1.default)().tz(LOGGING_TZ).format()} [${log.label}] ${log.level}: ${log.message}\n`))
            // TODO:  Investigate -- some error objects and stack trace is not displayed
        },
        server: {
            format: combine(label({
                label: loggerConfig.serviceName,
            }), winston_1.format.splat(), prettyPrint(), printf((log) => `${(0, moment_timezone_1.default)().tz(LOGGING_TZ).format()} [${log.label}] ${log.level}: ${log.message}\n`)),
            // TODO:  Investigate -- some error objects and stack trace is not displayed
        },
    };
    return (0, winston_1.createLogger)({
        level: process.env.LOG_LEVEL || 'info',
        transports: [new winston_1.transports.Console(loggerConfig.name !== 'local' ? options.server : options.local)],
        exceptionHandlers: [new winston_1.transports.Console(loggerConfig.name !== 'local' ? options.server : options.local)],
        exitOnError: false,
    });
}
exports.getLogger = getLogger;
function getAuditLogMiddleware(loggerConfig) {
    morgan_1.default.token('txId', (req) => req.txId); // Defined transactionId token
    morgan_1.default.token('ts', (req, res, tz) => (0, moment_timezone_1.default)().tz(tz).format()); // Define timestamp token
    const auditFormat = (tokens, req, res) => {
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
    return (0, morgan_1.default)(auditFormat, {
        skip: (req) => loggerConfig.auditLogExcludedPaths.includes(req.url)
    });
}
exports.getAuditLogMiddleware = getAuditLogMiddleware;
//# sourceMappingURL=logger_factory.js.map