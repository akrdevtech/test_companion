import express, { NextFunction, Request, RequestHandler, Response } from 'express';
import { IAppFeatures } from '../interfaces/appFeatures';
import { IAppConfig } from '../config';
import { logInfo } from '../log/util';
import { ITransactionLogger, TransactionLogger } from '../middleware/tracing/transaction_middleware';
import { RequestValidator } from '@akrdevtech/lib-express-joi-validation-middleware';

export interface IControllerOptions {
  basePath: string;
  moduleName: string;
}
export abstract class BaseController {
  protected API_BASE_URL: string;
  public appFeatures: IAppFeatures;
  public router: express.Router;
  protected appLogger: IAppFeatures["AppLoger"];
  public basePath: string;
  protected appConfig: IAppConfig;
  protected transactionLogger: ITransactionLogger;
  protected validator: RequestValidator;
  protected validateAll;
  protected validateBody;
  protected validateCookies;
  protected validateHeaders;
  protected validateQuery;
  protected validateParams;

  constructor(appConfig: IAppConfig, options: IControllerOptions, appFeatures?: IAppFeatures) {
    this.appConfig = appConfig;
    this.API_BASE_URL = appConfig.envConfig.apiBaseUrl;
    this.appFeatures = appFeatures;
    this.appLogger = this.appFeatures.AppLoger;
    this.basePath = `${this.API_BASE_URL}${options.basePath}`;
    this.transactionLogger = new TransactionLogger(options.moduleName);
    this.validator = new RequestValidator({ abortEarly: false });
    this.validateAll = this.validator.validateAll;
    this.validateBody = this.validator.validateBody;
    this.validateCookies = this.validator.validateCookies;
    this.validateHeaders = this.validator.validateHeaders;
    this.validateQuery = this.validator.validateQuery;
    this.validateParams = this.validator.validateParams;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected asyncHandler =
    (fn: RequestHandler) =>
      (req: Request, res: Response, next: NextFunction): Promise<any> => {
        logInfo(`[transactionId] ${req.txId}`);

        return Promise.resolve(fn(req, res, next)).catch(next);
      };

  public abstract getBasePath(): string;
  /**
   *
   * @param response Express response object
   * @param status Http status code
   * @param data response data to be returned
   */
  protected sendResponse<T>(response: Response, status: number, data: T): void {
    if (status >= 400) response.status(status).send(data);
    else response.status(status).send({ data });
  }

  protected getPagination(page?: number, limit?: number): { page: number; limit: number } {
    return { page: page || 1, limit: limit || 10 };
  }
}
