"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionLogger = exports.addTransactionId = void 0;
const httpHeader_1 = require("../../enums/httpHeader");
const util_1 = require("../../log/util");
const crypto_1 = require("crypto");
const addTransactionId = (req, _res, next) => {
    const uuid = (0, crypto_1.randomUUID)();
    req.header[httpHeader_1.HttpHeader.TX_ID] = uuid;
    req.txId = uuid;
    next();
};
exports.addTransactionId = addTransactionId;
function isEmpty(obj) {
    for (const prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            return false;
        }
    }
    return JSON.stringify(obj) === JSON.stringify({});
}
class TransactionLogger {
    constructor(moduleName) {
        this.moduleName = moduleName;
    }
    logTransaction(message) {
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        return (request, _response, next) => {
            let logMessage = `[${this.moduleName.toUpperCase()}] TxId ${request.txId} - ${message ? message : ''} `;
            const { body, params, query } = request;
            if (!isEmpty(body) || !isEmpty(params) || !isEmpty(query)) {
                const data = Object.assign({ body, params, query });
                logMessage += ` - Request ${JSON.stringify(data)}`;
            }
            (0, util_1.logInfo)(logMessage);
            next();
        };
    }
}
exports.TransactionLogger = TransactionLogger;
//# sourceMappingURL=transaction_middleware.js.map