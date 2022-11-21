import { ICoursesDbApi, CoursesDbApi } from "../../vendors/mongo/CoursesDbApi";
import { IAppConfig } from "../../config";
import { BaseService } from "../BaseService";
import { IAppFeatures } from "../../interfaces/appFeatures";
import { IDbPaginatedData } from "../../vendors/mongo/BaseMongoClient";
import { ICourseModel } from "../../interfaces/course";

export interface ICourseService {
    createCourse(courseData: ICourseModel): Promise<ICourseModel>;
    getAllCourses(page: number, limit: number): Promise<IDbPaginatedData<ICourseModel>>
}

export class CourseService extends BaseService implements ICourseService {
    private courseServicesDbApi: ICoursesDbApi;
    constructor(appConfig: IAppConfig, appFeatures?: IAppFeatures) {
        super(appFeatures, { moduleName: "Course Service" });
        this.courseServicesDbApi = new CoursesDbApi(appConfig.mongoConfig, appFeatures);
    }

    async getAllCourses(page: number, limit: number): Promise<IDbPaginatedData<ICourseModel>> {
        this.logInfo(`Fetching Courses List`);
        return this.courseServicesDbApi.getAllCourses(page, limit);
    }

    async createCourse(courseData: ICourseModel): Promise<ICourseModel> {
        this.logInfo(`Inserting Courses Data`);
        return this.courseServicesDbApi.createCourse(courseData);
    }
}