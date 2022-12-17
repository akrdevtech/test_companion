import { ICoursesDbApi, CoursesDbApi } from "../../vendors/mongo/CoursesDbApi";
import { IAppConfig } from "../../config";
import { BaseService } from "../BaseService";
import { IAppFeatures } from "../../interfaces/appFeatures";
import { IDbPaginatedData } from "../../vendors/mongo/BaseMongoClient";
import { ICourseModel } from "../../interfaces/course";
import { IGetPaginatedCourseListFiltersSchema } from "../../models/rest/course/getPaginatedCourseList";

export interface ICourseService {
    createCourse(courseData: ICourseModel): Promise<ICourseModel>;
    getPaginatedCourseList(page: number, limit: number, filters: IGetPaginatedCourseListFiltersSchema): Promise<IDbPaginatedData<ICourseModel>>
    getCourseMenuList(): Promise<Partial<ICourseModel>[]>;
    getCourseByCourseId(courseId: string): Promise<ICourseModel>;
    getNextCourseCode(): Promise<number>;
    generateCode(prefix: string, index: number): string;
    enrollStudentToCourse(courseId: string, numberOfStudents?: number): Promise<boolean>
}

export class CourseService extends BaseService implements ICourseService {
    private courseServicesDbApi: ICoursesDbApi;
    constructor(appConfig: IAppConfig, appFeatures?: IAppFeatures) {
        super(appFeatures, { moduleName: "Course Service" });
        this.courseServicesDbApi = new CoursesDbApi(appConfig.mongoConfig, appFeatures);
    }
    generateCode(prefix: string, index: number): string {
        if (index < 10) return `${prefix}-00${index}`;
        if (index < 100) return `${prefix}-0${index}`;
        return `${prefix}-${index}`;
    }
    async getNextCourseCode(): Promise<number> {
        this.logInfo(`Fetching Next Courses Code`);
        return this.courseServicesDbApi.getNextCourseCode();
    }
    async getCourseMenuList(): Promise<Partial<ICourseModel>[]> {
        this.logInfo(`Fetching Courses Menu List`);
        return this.courseServicesDbApi.getCourseMenuList();
    }
    async getCourseByCourseId(courseId: string): Promise<ICourseModel> {
        this.logInfo(`Fetching Course Data for course id ${courseId}`);
        return this.courseServicesDbApi.getCourseByCourseId(courseId);
    }
    async getPaginatedCourseList(page: number, limit: number, filters: IGetPaginatedCourseListFiltersSchema): Promise<IDbPaginatedData<ICourseModel>> {
        this.logInfo(`Fetching Courses List`);
        return this.courseServicesDbApi.getPaginatedCourseList(page, limit, filters);
    }
    async enrollStudentToCourse(courseId: string, numberOfStudents = 1): Promise<boolean> {
        this.logInfo(`Enrolling student to course`);
        return this.courseServicesDbApi.enrollStudentToCourse(courseId, numberOfStudents);
    }
    async createCourse(courseData: ICourseModel): Promise<ICourseModel> {
        this.logInfo(`Inserting Courses Data`);
        return this.courseServicesDbApi.createCourse(courseData);
    }
}