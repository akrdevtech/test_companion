import express from 'express';
import { IAppConfig } from '../../config';
import { HttpStatusCode } from '../../enums/httpStatusCode';
import { BaseController } from '../base_controller';

export class HealthCheckController extends BaseController {
  public basePath: string;
  public router: express.Router;
  private appConf: IAppConfig;

  constructor(appConfig: IAppConfig) {
    super(appConfig.envConfig);
    this.basePath = `${this.API_BASE_URL}/healthcheck`;
    this.router = express.Router();
    this.appConf = appConfig;
    this.intializeRoutes();
  }

  public getBasePath(): string {
    return this.basePath;
  }

  public intializeRoutes(): void {
    this.router.get(this.basePath, this.getHealth);
  }

  private getHealth = (request: express.Request, response: express.Response) => {
    response.status(HttpStatusCode.OK).send({ status: 'ok', txId: request.txId, appConfig: this.appConf });
  };
}
