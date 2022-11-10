import express from 'express';
import { IAppFeatures } from '../../interfaces/AppFeatures';
import { IAppConfig } from '../../config';
import { HttpStatusCode } from '../../enums/httpStatusCode';
import { BaseController } from '../BaseController';
import { IStudentService, StudentService } from './StudentServices';


export class StudentsController extends BaseController {
  public basePath: string;
  public studentServices: IStudentService;

  constructor(appConfig: IAppConfig, appFeatures?: IAppFeatures) {
    super(appConfig, { basePath: '/students', moduleName: 'Students Controller' }, appFeatures);
    this.router = express.Router();
    this.studentServices = new StudentService(appConfig, appFeatures)
    this.intializeRoutes();
  }

  public getBasePath(): string {
    return this.basePath;
  }

  public intializeRoutes(): void {
    this.router.get(this.basePath, [
      this.transactionLogger.logTransaction(`Get All Students`),
      this.getAllStudents
    ]);
  }

  private getAllStudents = async (request: express.Request, response: express.Response) => {
    const studentsList = await this.studentServices.getAllStudents(1, 10);
    response.status(HttpStatusCode.OK).send({ status: 'ok', txId: request.txId, studentsList });
  };
}
