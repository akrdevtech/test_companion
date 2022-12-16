import express, { NextFunction, Request, Response } from 'express';
import { IAppFeatures } from '../../interfaces/appFeatures';
import { IAppConfig } from '../../config';
import { HttpStatusCode } from '../../enums/httpStatusCode';
import { BaseController } from '../BaseController';
import { IStudentService, StudentService } from './StudentServices';
import { CourseService, ICourseService } from '../course/CourseServices';
import errors from '../../errors';
import { InternalErrorMessages } from '../../enums/errors';
import { CourseEnrollmentService, ICourseEnrollmentService } from '../enrollments/EnrollmentServices';
import { createNewStudentValidationSchema, getStudentAdmissionNumberSchema } from '../../models/validators/students';
import { ICreateStudentRequestSchema } from '../../models/rest/student/createStudent';
import { StudentDTO } from '../../models/domain/StudentDTO';
import { IGetPaginatedStudentListFiltersSchema, IGetPaginatedStudentListRequestSchema } from '../../models/rest/student/getPaginatedStudentList';
import { EStudentAdmissionFilter, EStudentGraduationFilter, EStudentPresenceFilter } from '../../enums/student';
const { InternalError } = errors;


export class StudentsController extends BaseController {
  public basePath: string;
  public studentServices: IStudentService;
  public courseServices: ICourseService;
  public courseEnrollmentServices: ICourseEnrollmentService;
  public studentDTO: StudentDTO;

  constructor(appConfig: IAppConfig, appFeatures?: IAppFeatures) {
    super(appConfig, { basePath: '/students', moduleName: 'Students Controller' }, appFeatures);
    this.router = express.Router();
    this.studentServices = new StudentService(appConfig, appFeatures)
    this.courseServices = new CourseService(appConfig, appFeatures)
    this.courseEnrollmentServices = new CourseEnrollmentService(appConfig, appFeatures)
    this.studentDTO = new StudentDTO();
    this.intializeRoutes();
  }

  public getBasePath(): string {
    return this.basePath;
  }

  public intializeRoutes(): void {
    this.router.get(this.basePath, [
      this.transactionLogger.logTransaction(`Get Students`),
      this.getPaginatedStudentList
    ]);
    this.router.post(this.basePath, [
      this.transactionLogger.logTransaction(`Create new Student`),
      this.validateAll(createNewStudentValidationSchema),
      this.asyncHandler(this.createNewStudent)
    ])
    this.router.get(`${this.basePath}/admno`, [
      this.transactionLogger.logTransaction(`Generate new admission number`),
      this.validateAll(getStudentAdmissionNumberSchema),
      this.getAutogeneratedAdmissionNumber
    ]);

  }

  private createNewStudent = async (request: Request, response: Response, next: NextFunction) => {
    const data = request.body as ICreateStudentRequestSchema;
    const { courseInfo: { course, dateOfAdmission } } = data;
    await this.courseEnrollmentServices.upsertEnrollment(course, dateOfAdmission);
    const courseData = await this.studentServices.createStudent(this.studentDTO.fromCreateRequestToDb(data));
    this.sendResponse(response, HttpStatusCode.OK, { status: HttpStatusCode.OK, txId: request.txId, courseData });
  }

  private getAutogeneratedAdmissionNumber = async (request: Request, response: Response, next: NextFunction) => {
    const { query: { courseId, dateOfAdmission } } = request;
    const courseInfo = await this.courseServices.getCourseByCourseId(courseId as string);
    if (!courseInfo) {
      next(new InternalError(InternalErrorMessages.FailedToFindCourse, HttpStatusCode.BAD_REQUEST));
    }
    const thisDate = new Date(dateOfAdmission as string);
    const enrollmentsOfCourse = await this.courseEnrollmentServices.getEnrollmentsForCourse(courseId as string, thisDate, thisDate);
    const courseCode = this.courseEnrollmentServices.getWithPaddingZeros(Number(courseInfo.code));
    const enrollCount = enrollmentsOfCourse ?
      this.courseEnrollmentServices.getWithPaddingZeros(Number(enrollmentsOfCourse.enrolled) + 1) :
      this.courseEnrollmentServices.getWithPaddingZeros(1);
    const thisYear = thisDate.getFullYear();
    const thisMonth = thisDate.getMonth() + 1;
    const centerCode = 'RPTC';
    const admissionNumber = `${centerCode}-${thisYear}${thisMonth > 9 ? thisMonth : `0${thisMonth}`}${courseCode}${enrollCount}`
    response.status(HttpStatusCode.OK).send({ status: HttpStatusCode.OK, txId: request.txId, admissionNumber });
  }

  private getPaginatedStudentList = async (request: Request, response: Response) => {
    const { page, limit, search, admission, course, graduation, presence }: IGetPaginatedStudentListRequestSchema = {
      page: Number(request.query.page),
      limit: Number(request.query.limit),
      search: request.query.search as string,
      course: request.query.course as string,
      admission: request.query.admission as EStudentAdmissionFilter,
      graduation: request.query.graduation as EStudentGraduationFilter,
      presence: request.query.presence as EStudentPresenceFilter,
    };
    const filters: IGetPaginatedStudentListFiltersSchema = { search, admission, course, graduation, presence };
    const studentsList = await this.studentServices.getPaginatedStudentList(page, limit, filters);
    response.status(HttpStatusCode.OK).send({ status: HttpStatusCode.OK, txId: request.txId, studentsList });
  };
}
