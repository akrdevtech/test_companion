import { DbCollection } from '../../enums/dbCollection';
import { Collection,ObjectId } from 'mongodb';
import { BaseMongoClient, IDbPaginatedData } from './BaseMongoClient';
import { IMongoConfig } from '../../config';
import { IStudentsModel } from '../../interfaces/students';
import { IAppFeatures } from '../../interfaces/appFeatures';
import AppErrors from '../../errors';
import { InternalErrorMessages } from '../../enums/errors';
import { InternalError } from '@akrdevtech/lib-error-handler-middleware';
import { HttpStatusCode } from '../../enums/httpStatusCode';
const { DatabaseError } = AppErrors;
export interface IStudentsDbApi {
    getAllStudents(page: number, limit: number): Promise<IDbPaginatedData<IStudentsModel>>;
    getStudentById(id: ObjectId | string): Promise<IStudentsModel>;
    createStudent(studentData: IStudentsModel): Promise<IStudentsModel>;
}

export class StudentsDbApi extends BaseMongoClient implements IStudentsDbApi {
    protected appLogger: IAppFeatures["AppLoger"];

    constructor(mongoConfig: IMongoConfig, appFeatures?: IAppFeatures) {
        super(mongoConfig, appFeatures, { moduleName: 'Student DB' });
        this.appLogger = appFeatures.AppLoger;
    }

    protected async getStudentCollection(): Promise<Collection> {
        const db = await this.getDb();
        return db.collection(DbCollection.STUDENTS);
    }

    async getAllStudents(page: number, limit: number): Promise<IDbPaginatedData<IStudentsModel>> {
        this.appLogger.logInfo(`[Mongo Service] Fetching Category List`);

        const studentCollection = await this.getStudentCollection();

        try {
            const query = {};
            const sort = "createdAt";
            const sortDirection = -1;

            return this.paginateFindQuery(studentCollection, query, sort, sortDirection, page, limit);
        } catch (error) {
            this.appLogger.logError(JSON.stringify(error));
            throw new DatabaseError(error.message, error.stack);
        }
    }
    async getStudentById(id: ObjectId | string): Promise<IStudentsModel> {
        this.logInfo(`Fetching Student Data for id ${id.toString()}`);
        const studentCollection = await this.getStudentCollection();
        const record = await studentCollection.findOne({ _id: new ObjectId(id) });
        return record as IStudentsModel;
    }
    async createStudent(studentData: IStudentsModel): Promise<IStudentsModel> {
        this.logInfo(`Creating new Student ${studentData.courseInfo.admissionNumber}`);
        try {
            const studentCollection = await this.getStudentCollection();
            const insertResponse = await studentCollection.insertOne(studentData);
            const id = insertResponse?.insertedId ?? null;
            if (id) {
                return this.getStudentById(id);
            }
            throw new InternalError(InternalErrorMessages.FailedToInsertCourse, HttpStatusCode.BAD_REQUEST);
        } catch (error) {
            this.logError(JSON.stringify(error));
            throw new DatabaseError(error.message, error.stack);
        }
    }
}
