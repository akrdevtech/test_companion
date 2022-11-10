"use strict";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorSource_1 = require("../../enums/errorSource");
const httpStatusCode_1 = require("../../enums/httpStatusCode");
const httpStatusMessage_1 = require("../../enums/httpStatusMessage");
function getUniqueErrors(errors) {
    const uniqueArray = [];
    errors.forEach((error) => {
        if (!uniqueArray.find((uE) => uE.param === error.param))
            uniqueArray.push(error);
    });
    return uniqueArray;
}
/* eslint-disable complexity */
const errorHandler = (err, req, res, next) => {
    // console.info('Error handler triggered');
    if (res.headersSent) {
        return next(err);
    }
    const body = {
        message: err.message ? err.message : err.errorMessage ? err.errorMessage : httpStatusMessage_1.HttpStatusMessage.INTERNAL_SERVER_ERROR,
        stack: err.stack ? err.stack : '',
        errors: err.errors ? err.errors : [],
        source: err.source ? err.source : errorSource_1.ErrorSource.INTERNAL,
        transactionId: req.txId,
    };
    if (body.source === 'Validation' && body.errors.length) {
        const errorList = getUniqueErrors(body.errors);
        const msg = errorList.reduce((str, erroDoc, currentIndex, arr) => {
            if (currentIndex >= arr.length - 1)
                return str + erroDoc.param + ' - ' + erroDoc.msg;
            else
                return str + erroDoc.param + ' - ' + erroDoc.msg + ', ';
        }, '');
        if (msg.length)
            body.message = msg;
    }
    const status = err.status || err.statusCode || httpStatusCode_1.HttpStatusCode.INTERNAL_SERVER_ERROR;
    res.status(status).send(body);
    next();
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map