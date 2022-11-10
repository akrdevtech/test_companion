import { NextFunction, Request, Response } from 'express';
import express from 'express';
import { HttpHeader } from '../../enums/httpHeader';
import { logInfo } from '../../log/util';
import { randomUUID } from 'crypto';

export const addTransactionId = (req: express.Request, _res: express.Response, next: express.NextFunction): void => {
  const uuid = randomUUID();
  req.header[HttpHeader.TX_ID] = uuid;
  req.txId = uuid;
  next();
}

function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
}

export interface ITransactionLogger {
  logTransaction(message?: string);
}
export class TransactionLogger implements ITransactionLogger {
  private moduleName: string;

  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }

  public logTransaction(message?: string) {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return (request: Request, _response: Response, next: NextFunction) => {
      let logMessage = `[${this.moduleName.toUpperCase()}] TxId ${request.txId} - ${message ? message : ''} `;
      const { body, params, query } = request;
      if (!isEmpty(body) || !isEmpty(params) || !isEmpty(query)) {
        const data = Object.assign({ body, params, query });
        logMessage += ` - Request ${JSON.stringify(data)}`;
      }
      logInfo(logMessage);
      next();
    };
  }
}
