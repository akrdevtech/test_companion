import { ICoursesDbApi, CoursesDbApi } from "../../vendors/mongo/CoursesDbApi";
import { IAppConfig } from "../../config";
import { BaseService } from "../BaseService";
import { IAppFeatures } from "../../interfaces/appFeatures";
import { IDbPaginatedData } from "../../vendors/mongo/BaseMongoClient";
import { ICourseModel } from "../../interfaces/course";
import { CourseStatus } from "../../enums/course";
import { IGetPaginatedCourseListFiltersSchema } from "../../models/rest/getPaginatedCourseList";

export interface ICourseService {
    createCourse(courseData: ICourseModel): Promise<ICourseModel>;
    getPaginatedCourseList(page: number, limit: number, filters: IGetPaginatedCourseListFiltersSchema): Promise<IDbPaginatedData<ICourseModel>>
}

export class CourseService extends BaseService implements ICourseService {
    private courseServicesDbApi: ICoursesDbApi;
    constructor(appConfig: IAppConfig, appFeatures?: IAppFeatures) {
        super(appFeatures, { moduleName: "Course Service" });
        this.courseServicesDbApi = new CoursesDbApi(appConfig.mongoConfig, appFeatures);
    }

    async getPaginatedCourseList(page: number, limit: number, filters: IGetPaginatedCourseListFiltersSchema): Promise<IDbPaginatedData<ICourseModel>> {
        this.logInfo(`Fetching Courses List`);
        return this.courseServicesDbApi.getPaginatedCourseList(page, limit, filters);
    }

    async createCourse(courseData: ICourseModel): Promise<ICourseModel> {
        this.logInfo(`Inserting Courses Data`);
        return this.courseServicesDbApi.createCourse(courseData);
    }
}