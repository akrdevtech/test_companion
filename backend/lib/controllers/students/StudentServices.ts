import { IStudentsDbApi, StudentsDbApi } from "../../vendors/mongo/StudentsDbApi";
import { IAppConfig } from "../../config";
import { BaseService } from "../BaseService";
import { IAppFeatures } from "../../interfaces/AppFeatures";
import { IDbPaginatedData } from "../../vendors/mongo/BaseMongoClient";
import { IDbStudents } from "../../interfaces/Students";

export interface IStudentService {
    getAllStudents(page: number, limit: number): Promise<IDbPaginatedData<IDbStudents>>
}

export class StudentService extends BaseService implements IStudentService {
    private studentServicesDbApi: IStudentsDbApi;

    constructor(appConfig: IAppConfig, appFeatures?: IAppFeatures) {
        super(appFeatures);
        this.studentServicesDbApi = new StudentsDbApi(appConfig.mongoConfig, appFeatures);
    }

    async getAllStudents(page: number, limit: number): Promise<IDbPaginatedData<IDbStudents>> {
        this.appLogger.logInfo(`Fetching Students List`);
        return this.studentServicesDbApi.getAllStudents(page, limit);
    }
}