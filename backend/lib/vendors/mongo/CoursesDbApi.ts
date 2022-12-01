import { DbCollection } from '../../enums/dbCollection';
import { Collection } from 'mongodb';
import { BaseMongoClient, IDbPaginatedData } from './BaseMongoClient';
import { IMongoConfig } from '../../config';
import { ICourseModel } from '../../interfaces/course';
import { IAppFeatures } from '../../interfaces/appFeatures';
import { ObjectId } from 'mongodb';
import { InternalErrorMessages } from '../../enums/errors';
import Errors from '../../errors';
import { CourseStatus } from '../../enums/course';
import { IGetPaginatedCourseListFiltersSchema } from '../../models/rest/getPaginatedCourseList';
import { HttpStatusCode } from '@akrdevtech/lib-error-handler-middleware';
const { DatabaseError, InternalError } = Errors;

export interface ICoursesDbApi {
    getPaginatedCourseList(page: number, limit: number, filters: IGetPaginatedCourseListFiltersSchema): Promise<IDbPaginatedData<ICourseModel>>;
    getCourseMenuList(): Promise<Partial<ICourseModel>[]>;
    createCourse(courseData: ICourseModel): Promise<ICourseModel>;
    getCourseByCourseId(courseId: string): Promise<ICourseModel>;
    getNextCourseCode(): Promise<number>;
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

    async getNextCourseCode(): Promise<number> {
        this.logInfo(`Fetching Next Course Code`);
        const courseCollection = await this.getCourseCollection();
        const response = await courseCollection.find().sort({ code: -1 }).limit(1).toArray() as Partial<ICourseModel>[];
        return response?.[0]?.code ? Number(response?.[0]?.code) + 1 : 1;
    }

    async getCourseMenuList(): Promise<Partial<ICourseModel>[]> {
        this.logInfo(`Fetching Course Menu List`);
        const courseCollection = await this.getCourseCollection();
        const query = { status: CourseStatus.ACTIVE };
        const record = await courseCollection.aggregate([
            { $match: query },
            { $project: { courseId: 1, courseName: 1 } },
            { $sort: { courseName: 1 } }
        ]).toArray();
        return record as Partial<ICourseModel>[];
    }
    async getPaginatedCourseList(page: number, limit: number, filters: IGetPaginatedCourseListFiltersSchema): Promise<IDbPaginatedData<ICourseModel>> {
        this.logInfo(`Fetching Course List`);
        const courseCollection = await this.getCourseCollection();
        try {
            let query = {
                status: filters.status,
                $or: [{ courseId: new RegExp(filters.search, 'i') }, { courseName: new RegExp(filters.search, 'i') }],
            };
            if (!filters.search) {
                delete query.$or
            }
            if (!filters.status) {
                delete query.status
            }
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

    async getCourseByCourseId(courseId: string): Promise<ICourseModel> {
        this.logInfo(`Fetching Course Data for course id ${courseId}`);
        const courseCollection = await this.getCourseCollection();
        const record = await courseCollection.findOne({ courseId });
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
            throw new InternalError(InternalErrorMessages.FailedToInsertCourse, HttpStatusCode.BAD_REQUEST);
        } catch (error) {
            this.logError(JSON.stringify(error));
            throw new DatabaseError(error.message, error.stack);
        }
    }
}
