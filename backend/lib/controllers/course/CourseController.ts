import express, { NextFunction } from 'express';
import { IAppFeatures } from '../../interfaces/appFeatures';
import { IAppConfig } from '../../config';
import { HttpStatusCode } from '../../enums/httpStatusCode';
import { BaseController } from '../BaseController';
import { ICourseService, CourseService } from './CourseServices';
import { createCourseValidationSchema } from '../../models/validators/course';
import { CourseDTO } from '../../models/domain/CourseDTO';
import { ICreateCourseRequestSchema } from '../../models/rest/createCourse';
import { CourseStatus } from '../../enums/course';
import { IGetPaginatedCourseListFiltersSchema } from '../../models/rest/getPaginatedCourseList';

interface IGetPaginatedCourseListRequestSchema { page: number, limit: number, search?: string, status?: CourseStatus }
export class CoursesController extends BaseController {
  public basePath: string;
  public courseServices: ICourseService;
  public courseDTO: CourseDTO;

  constructor(appConfig: IAppConfig, appFeatures?: IAppFeatures) {
    super(appConfig, { basePath: '/courses', moduleName: 'Courses Controller' }, appFeatures);
    this.router = express.Router();
    this.courseServices = new CourseService(appConfig, appFeatures);
    this.courseDTO = new CourseDTO();
    this.intializeRoutes();
  }

  public getBasePath(): string {
    return this.basePath;
  }

  public intializeRoutes(): void {
    this.router.get(this.basePath, [
      this.transactionLogger.logTransaction(`Get All Courses`),
      this.asyncHandler(this.getPaginatedCourseList)
    ]);
    this.router.post(this.basePath, [
      this.transactionLogger.logTransaction(`Create New Course`),
      this.validateAll(createCourseValidationSchema),
      this.asyncHandler(this.createCourse),
    ]);
  }

  private getPaginatedCourseList = async (request: express.Request, response: express.Response, next: NextFunction) => {
    const { page, limit, search, status }: IGetPaginatedCourseListRequestSchema = {
      page: Number(request.query.page),
      limit: Number(request.query.limit),
      search: request.query.search as string,
      status: request.query.status as CourseStatus,
    };
    const filters: IGetPaginatedCourseListFiltersSchema = { search, status };
    const coursesList = await this.courseServices.getPaginatedCourseList(page, limit, filters);
    this.sendResponse(response, HttpStatusCode.OK, { status: HttpStatusCode.OK, txId: request.txId, coursesList });
  };

  private createCourse = async (request: express.Request, response: express.Response, next: NextFunction) => {
    const createData: ICreateCourseRequestSchema = request.body;
    const courseData = await this.courseServices.createCourse(this.courseDTO.fromCreateRequestToDb(createData));
    this.sendResponse(response, HttpStatusCode.OK, { status: HttpStatusCode.OK, txId: request.txId, courseData });
  };
}
