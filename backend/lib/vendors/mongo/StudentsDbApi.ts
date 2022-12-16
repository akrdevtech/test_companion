import { DbCollection } from '../../enums/dbCollection';
import { Collection, ObjectId } from 'mongodb';
import { BaseMongoClient, IDbPaginatedData } from './BaseMongoClient';
import { IMongoConfig } from '../../config';
import { IStudentsModel } from '../../interfaces/students';
import { IAppFeatures } from '../../interfaces/appFeatures';
import AppErrors from '../../errors';
import { InternalErrorMessages } from '../../enums/errors';
import { InternalError } from '@akrdevtech/lib-error-handler-middleware';
import { HttpStatusCode } from '../../enums/httpStatusCode';
import { IGetPaginatedStudentListFiltersSchema } from '../../models/rest/student/getPaginatedStudentList';
import { EStudentAdmissionFilter, EStudentGraduationFilter, EStudentPresenceFilter } from '../../enums/student';
const { DatabaseError } = AppErrors;
export interface IStudentsDbApi {
    getPaginatedStudentList(page: number, limit: number, filters: IGetPaginatedStudentListFiltersSchema): Promise<IDbPaginatedData<IStudentsModel>>;
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

    async getPaginatedStudentList(page: number, limit: number, filters: IGetPaginatedStudentListFiltersSchema): Promise<IDbPaginatedData<IStudentsModel>> {
        this.logInfo(`Fetching Student List`);

        const studentCollection = await this.getStudentCollection();

        try {
            let query = {
                'settings.isActive': filters.admission === EStudentAdmissionFilter.ACTIVE,
                'settings.isPresent': filters.presence === EStudentPresenceFilter.PRESENT,
                'settings.hasGraduated': filters.graduation === EStudentGraduationFilter.COMPLETED,
                'courseInfo.course': filters.course,
                $or: [
                    { firstName: new RegExp(filters.search, 'i') },
                    { lastName: new RegExp(filters.search, 'i') },
                    { 'contactInfo.email': new RegExp(filters.search, 'i') },
                    { 'contactInfo.phone': new RegExp(filters.search, 'i') },
                ],
            };
            if (!filters.search) {
                delete query.$or
            }
            if (!filters.presence || filters.presence === EStudentPresenceFilter.ANY) {
                delete query['settings.isActive']
            }
            if (!filters.admission || filters.admission === EStudentAdmissionFilter.ANY) {
                delete query['settings.isPresent']
            }
            if (!filters.graduation || filters.graduation === EStudentGraduationFilter.ANY) {
                delete query['settings.hasGraduated']
            }
            if (!filters.course) {
                delete query['courseInfo.course']
            }            
            const sort = 'createdAt';
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
