import { DbCollection } from '../../enums/dbCollection';
import { Collection } from 'mongodb';
import { BaseMongoClient, IDbPaginatedData } from './BaseMongoClient';
import { IMongoConfig } from '../../config';
import { ICourseModel } from '../../interfaces/course';
import { IAppFeatures } from '../../interfaces/appFeatures';
import { ObjectId } from 'mongodb';
import { InternalErrorMessages, InternalErrorStatusCodes } from '../../enums/errors';
import Errors from '../../errors';
const { DatabaseError, InternalError } = Errors;

export interface ICoursesDbApi {
    getAllCourses(page: number, limit: number): Promise<IDbPaginatedData<ICourseModel>>;
    createCourse(courseData: ICourseModel): Promise<ICourseModel>;
}

export class CoursesDbApi extends BaseMongoClient implements ICoursesDbApi {
    protected appLogger: IAppFeatures["AppLoger"];

    constructor(mongoConfig: IMongoConfig, appFeatures?: IAppFeatures) {
        super(mongoConfig, appFeatures, { moduleName: 'Course DB' });
    }

    protected async getCourseCollection(): Promise<Collection> {
        const db = await this.getDb();
        return db.collection(DbCollection.COURSES);
    }

    async getAllCourses(page: number, limit: number): Promise<IDbPaginatedData<ICourseModel>> {
        this.logInfo(`Fetching Course List`);
        const courseCollection = await this.getCourseCollection();
        try {
            const query = {};
            const sort = "createdAt";
            const sortDirection = -1;
            return this.paginateFindQuery(courseCollection, query, sort, sortDirection, page, limit);
        } catch (error) {
            this.logError(JSON.stringify(error));
            throw new DatabaseError(error.message, error.stack);
        }
    }

    async getCourseById(id: ObjectId | string): Promise<ICourseModel> {
        this.logInfo(`Fetching Course Data for id ${id.toString()}`);
        const courseCollection = await this.getCourseCollection();
        const record = await courseCollection.findOne({ _id: new ObjectId(id) });
        return record as ICourseModel;
    }

    async createCourse(courseData: ICourseModel): Promise<ICourseModel> {
        this.logInfo(`Creating new Course ${courseData.courseName}`);
        try {
            const courseCollection = await this.getCourseCollection();
            const insertResponse = await courseCollection.insertOne(courseData);
            const id = insertResponse?.insertedId ?? null;
            if (id) {
                return this.getCourseById(id);
            }
            throw new InternalError(InternalErrorMessages.FailedToInsertCourse, InternalErrorStatusCodes.FailedToInsertCourse);
        } catch (error) {
            this.logError(JSON.stringify(error));
            throw new DatabaseError(error.message, error.stack);
        }
    }
}
