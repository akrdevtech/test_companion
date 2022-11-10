import express from 'express';
import { IAppFeatures } from '../../interfaces/AppFeatures';
import { IAppConfig } from '../../config';
import { HttpStatusCode } from '../../enums/httpStatusCode';
import { BaseController } from '../base_controller';
import { IDbCollections } from '../../vendors/database/DbBase';

export class HealthCheckController extends BaseController {
  public basePath: string;
  public router: express.Router;
  private appConf: IAppConfig;
  private dbCollection: IDbCollections;

  constructor(appConfig: IAppConfig, appFeatures?:IAppFeatures) {
    super(appConfig.envConfig);
    this.basePath = `${this.API_BASE_URL}/healthcheck`;
    this.router = express.Router();
    this.appConf = appConfig;
    this.dbCollection = appFeatures.DbCollections;
    this.intializeRoutes();
  }

  public getBasePath(): string {
    return this.basePath;
  }

  public intializeRoutes(): void {
    this.router.get(this.basePath, this.getHealth);
  }

  private getHealth = (request: express.Request, response: express.Response) => {
    // this.dbCollection.Users.find()
    response.status(HttpStatusCode.OK).send({ status: 'ok', txId: request.txId, appConfig: this.appConf });
  };
}
