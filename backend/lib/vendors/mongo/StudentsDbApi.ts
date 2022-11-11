import { DbCollection } from '../../enums/dbCollection';
import { Collection } from 'mongodb';
import { DatabaseError } from '../../errors/db_error';
import { BaseMongoClient, IDbPaginatedData } from './BaseMongoClient';
import { IMongoConfig } from '../../config';
import { IStudentsModel } from '../../interfaces/students';
import { IAppFeatures } from '../../interfaces/appFeatures';

export interface IStudentsDbApi {
    getAllStudents(page: number, limit: number): Promise<IDbPaginatedData<IStudentsModel>>;
}

export class StudentsDbApi extends BaseMongoClient implements IStudentsDbApi {
    protected appLogger: IAppFeatures["AppLoger"];

    constructor(mongoConfig: IMongoConfig, appFeatures?: IAppFeatures) {
        super(mongoConfig);
        this.appLogger = appFeatures.AppLoger;
    }

    protected async getServiceCollection(): Promise<Collection> {
        const db = await this.getDb();
        return db.collection(DbCollection.STUDENTS);
    }

    async getAllStudents(page: number, limit: number): Promise<IDbPaginatedData<IStudentsModel>> {
        this.appLogger.logInfo(`[Mongo Service] Fetching Category List`);

        const serviceCollection = await this.getServiceCollection();

        try {
            const query = {};
            const sort = "createdAt";
            const sortDirection = -1;

            return this.paginateFindQuery(serviceCollection, query, sort, sortDirection, page, limit);
        } catch (error) {
            this.appLogger.logError(JSON.stringify(error));
            throw new DatabaseError(error.message, error.stack);
        }
    }
}
