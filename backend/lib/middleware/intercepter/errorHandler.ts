/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ErrorSource } from '../../enums/errorSource';
import { HttpStatusCode } from '../../enums/httpStatusCode';
import { HttpStatusMessage } from '../../enums/httpStatusMessage';

export interface ValidationErrorType {
  location: string;
  msg: string;
  param: string;
  value?: string;
}

function getUniqueErrors(errors: Array<ValidationErrorType>) {
  const uniqueArray: Array<ValidationErrorType> = [];

  errors.forEach((error) => {
    if (!uniqueArray.find((uE) => uE.param === error.param)) uniqueArray.push(error);
  });

  return uniqueArray;
}

/* eslint-disable complexity */
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // console.info('Error handler triggered');

  if (res.headersSent) {
    return next(err);
  }

  const body = {
    message: err.message ? err.message : err.errorMessage ? err.errorMessage : HttpStatusMessage.INTERNAL_SERVER_ERROR,
    stack: err.stack ? err.stack : '',
    errors: err.errors ? err.errors : [],
    source: err.source ? err.source : ErrorSource.INTERNAL,
    transactionId: req.txId,
  };

  if (body.source === 'Validation' && body.errors.length) {
    const errorList = getUniqueErrors(body.errors);

    const msg = errorList.reduce(
      (str: string, erroDoc: ValidationErrorType, currentIndex: number, arr: Array<ValidationErrorType>) => {
        if (currentIndex >= arr.length - 1) return str + erroDoc.param + ' - ' + erroDoc.msg;
        else return str + erroDoc.param + ' - ' + erroDoc.msg + ', ';
      },
      '',
    );

    if (msg.length) body.message = msg;
  }

  const status = err.status || err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;

  res.status(status).send(body);

  next();
};
