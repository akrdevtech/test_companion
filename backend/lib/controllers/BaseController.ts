import express, { NextFunction, Request, RequestHandler, Response } from 'express';
import { IAppFeatures } from '../interfaces/AppFeatures';
import { IAppConfig, IEnvConfig } from '../config';
import { RequestValidationError } from '../errors/request_validation_error';
import { logInfo } from '../log/util';
import { ITransactionLogger, TransactionLogger } from '../middleware/tracing/transaction_middleware';

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

  constructor(appConfig: IAppConfig, options: IControllerOptions, appFeatures?: IAppFeatures) {
    this.appConfig = appConfig;
    this.API_BASE_URL = appConfig.envConfig.apiBaseUrl;
    this.appFeatures = appFeatures;
    this.appLogger = this.appFeatures.AppLoger;
    this.basePath = `${this.API_BASE_URL}${options.basePath}`;
    this.transactionLogger = new TransactionLogger(options.moduleName);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected asyncHandler =
    (fn: RequestHandler) =>
      (req: Request, res: Response, next: NextFunction): Promise<any> => {
        logInfo(`[transactionId] ${req.txId}`);

        this.validateRequest(req);

        return Promise.resolve(fn(req, res, next)).catch(next);
      };

  public abstract getBasePath(): string;

  private validateRequest(request: express.Request): void {
    const errors = null;
    if (errors) {
      throw new RequestValidationError(errors.array());
    }
  }
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
