import { ICourseEnrollmentsDbApi, CourseEnrollmentsDbApi } from "../../vendors/mongo/EnrollmentsDbApi";
import { IAppConfig } from "../../config";
import { BaseService } from "../BaseService";
import { IAppFeatures } from "../../interfaces/appFeatures";
import { IDbPaginatedData } from "../../vendors/mongo/BaseMongoClient";
import { ICourseEnrollmentsModel } from "../../interfaces/enrollment";

export interface ICourseEnrollmentService {
    getWithPaddingZeros(number: number): string;
    upsertEnrollment(courseId: string, admissionDate: Date): Promise<ICourseEnrollmentsModel>;
    getEnrollmentsForCourse(courseId: string, fromDate: Date, toDate: Date): Promise<ICourseEnrollmentsModel>;
}

export class CourseEnrollmentService extends BaseService implements ICourseEnrollmentService {
    private courseEnrollmentDbApi: ICourseEnrollmentsDbApi;
    constructor(appConfig: IAppConfig, appFeatures?: IAppFeatures) {
        super(appFeatures, { moduleName: "Enrollment Service" });
        this.courseEnrollmentDbApi = new CourseEnrollmentsDbApi(appConfig.mongoConfig, appFeatures);
    }

    getWithPaddingZeros(number: number): string {
        if (number < 10) return `00${number}`;
        if (number < 100) return `0${number}`;
        return `${number}`;
    }

    async getEnrollmentsForCourse(courseId: string, fromDate = new Date(), toDate = new Date()): Promise<ICourseEnrollmentsModel> {
        this.logInfo(`Fetching Enrollments for the course ${courseId} between dates ${fromDate} - ${toDate}`);
        return this.courseEnrollmentDbApi.getEnrollmentsForCourse(courseId, fromDate, toDate);
    }

    async upsertEnrollment(courseId: string, admissionDate = new Date()): Promise<ICourseEnrollmentsModel> {
        this.logInfo(`Upserting Enrollments Data for course ${courseId} on ${admissionDate}`);
        const thisDate = new Date(admissionDate);
        const thisYear = thisDate.getFullYear();
        const thisMonth = thisDate.getMonth();

        const existing = await this.getEnrollmentsForCourse(courseId, new Date(admissionDate), new Date(admissionDate));
        if (existing) {
            const updateObject: Partial<ICourseEnrollmentsModel> = {
                courseId,
                year: thisYear,
                month: thisMonth,
                enrolled: existing.enrolled + 1
            }
            return await this.courseEnrollmentDbApi.updateCourseEnrollment(existing._id?.toString(), updateObject);
        }
        const createObject: ICourseEnrollmentsModel = {
            courseId,
            enrolled: 1,
            month: thisMonth,
            year: thisYear,
        }
        return this.courseEnrollmentDbApi.createCourseEnrollment(createObject);
    }
}