import express from 'express';
import { IAppFeatures } from '../../interfaces/appFeatures';
import { IAppConfig } from '../../config';
import { HttpStatusCode } from '../../enums/httpStatusCode';
import { BaseController } from '../BaseController';


export class HealthCheckController extends BaseController {
  public basePath: string;

  constructor(appConfig: IAppConfig, appFeatures?: IAppFeatures) {
    super(appConfig, { basePath: '/healthcheck', moduleName: 'Health Controller' }, appFeatures);
    this.router = express.Router();
    this.intializeRoutes();
  }

  public getBasePath(): string {
    return this.basePath;
  }

  public intializeRoutes(): void {
    this.router.get(this.basePath, [
      this.transactionLogger.logTransaction(`Get App Health`),
      this.getHealth
    ]);
  }

  private getHealth = (request: express.Request, response: express.Response) => {
    response.status(HttpStatusCode.OK).send({ status: 'ok', txId: request.txId, appConfig: this.appConfig });
  };
}
