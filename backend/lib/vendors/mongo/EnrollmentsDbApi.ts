import { DbCollection } from '../../enums/dbCollection';
import { Collection } from 'mongodb';
import { BaseMongoClient } from './BaseMongoClient';
import { IMongoConfig } from '../../config';
import { ICourseEnrollmentsModel } from '../../interfaces/enrollment';
import { IAppFeatures } from '../../interfaces/appFeatures';
import { ObjectId } from 'mongodb';
import { InternalErrorMessages } from '../../enums/errors';
import Errors from '../../errors';
import { HttpStatusCode } from '../../enums/httpStatusCode';
const { DatabaseError, InternalError } = Errors;

export interface ICourseEnrollmentsDbApi {
    getCourseEnrollmentById(id: ObjectId | string): Promise<ICourseEnrollmentsModel>;
    getEnrollmentsForCourse(courseId: string, fromDate: Date, toDate: Date): Promise<ICourseEnrollmentsModel>;
    createCourseEnrollment(enrollmentData: ICourseEnrollmentsModel): Promise<ICourseEnrollmentsModel>;
    updateCourseEnrollment(id: string, enrollmentData: Partial<ICourseEnrollmentsModel>): Promise<ICourseEnrollmentsModel>;
}
export class CourseEnrollmentsDbApi extends BaseMongoClient implements ICourseEnrollmentsDbApi {
    protected appLogger: IAppFeatures["AppLoger"];

    constructor(mongoConfig: IMongoConfig, appFeatures?: IAppFeatures) {
        super(mongoConfig, appFeatures, { moduleName: 'Enrollment DB' });
    }

    protected async getCourseEnrollmentCollection(): Promise<Collection> {
        const db = await this.getDb();
        return db.collection(DbCollection.ENROLLMENTS);
    }

    async getCourseEnrollmentById(id: ObjectId | string): Promise<ICourseEnrollmentsModel> {
        this.logInfo(`Fetching Course Data for id ${id.toString()}`);
        const courseCollection = await this.getCourseEnrollmentCollection();
        const record = await courseCollection.findOne({ _id: new ObjectId(id) });
        return record as ICourseEnrollmentsModel;
    }

    async getEnrollmentsForCourse(courseId: string, fromDate: Date, toDate: Date): Promise<ICourseEnrollmentsModel> {
        this.logInfo(`Fetching Course Enrollment List`);
        const enrollmentCollection = await this.getCourseEnrollmentCollection();
        const query = {
            courseId,
            year: { $gte: new Date(fromDate).getFullYear(), $lte: new Date(toDate).getFullYear() },
            month: { $gte: new Date(fromDate).getMonth(), $lte: new Date(toDate).getMonth() },
        };
        const record = await enrollmentCollection.findOne(query);
        return record ? record as ICourseEnrollmentsModel : null;
    }

    async createCourseEnrollment(enrollmentData: ICourseEnrollmentsModel): Promise<ICourseEnrollmentsModel> {
        this.logInfo(`Creating new Enrollment for course ${enrollmentData.courseId}`);
        try {
            const enrollmentCollection = await this.getCourseEnrollmentCollection();
            const insertResponse = await enrollmentCollection.insertOne(enrollmentData);
            const id = insertResponse?.insertedId ?? null;
            if (id) {
                return this.getCourseEnrollmentById(id);
            }
            throw new InternalError(
                InternalErrorMessages.FailedToInsertCourseEnrollments,
                HttpStatusCode.BAD_REQUEST
            );
        } catch (error) {
            this.logError(JSON.stringify(error));
            throw new DatabaseError(error.message, error.stack);
        }
    }

    async updateCourseEnrollment(id: string, enrollmentData: Partial<ICourseEnrollmentsModel>): Promise<ICourseEnrollmentsModel> {
        try {
            this.logInfo(`Updating Enrollment  ${id} with ${JSON.stringify(enrollmentData)}`);
            const enrollmentCollection = await this.getCourseEnrollmentCollection();
            const updateResponse = await enrollmentCollection.updateOne({ _id: new ObjectId(id) }, { $set: enrollmentData });
            this.logInfo(`${updateResponse.modifiedCount ? `Updated ${updateResponse.modifiedCount} records` : `Failed to update`}`);
            return this.getCourseEnrollmentById(id);
        } catch (error) {
            this.logError(JSON.stringify(error));
            throw new DatabaseError(error.message, error.stack);
        }
    }
}
