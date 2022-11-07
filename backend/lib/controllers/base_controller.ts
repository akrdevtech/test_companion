import express, { NextFunction, Request, RequestHandler, Response } from 'express';
import { IEnvConfig } from '../config';
import { RequestValidationError } from '../errors/request_validation_error';
import { logInfo } from '../log/util';

export abstract class BaseController {
  protected API_BASE_URL: string;
  public router: express.Router;

  constructor(envConfig: IEnvConfig) {
    this.API_BASE_URL = envConfig.apiBaseUrl;
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
