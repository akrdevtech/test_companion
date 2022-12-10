import { IStudentsDbApi, StudentsDbApi } from "../../vendors/mongo/StudentsDbApi";
import { IAppConfig } from "../../config";
import { BaseService } from "../BaseService";
import { IAppFeatures } from "../../interfaces/appFeatures";
import { IDbPaginatedData } from "../../vendors/mongo/BaseMongoClient";
import { IStudentsModel } from "../../interfaces/students";

export interface IStudentService {
    getAllStudents(page: number, limit: number): Promise<IDbPaginatedData<IStudentsModel>>;
    createStudent(studentData: IStudentsModel): Promise<IStudentsModel>;
}

export class StudentService extends BaseService implements IStudentService {
    private studentServicesDbApi: IStudentsDbApi;

    constructor(appConfig: IAppConfig, appFeatures?: IAppFeatures) {
        super(appFeatures, { moduleName: "Student Service" });
        this.studentServicesDbApi = new StudentsDbApi(appConfig.mongoConfig, appFeatures);
    }

    async getAllStudents(page: number, limit: number): Promise<IDbPaginatedData<IStudentsModel>> {
        this.appLogger.logInfo(`Fetching Students List`);
        return this.studentServicesDbApi.getAllStudents(page, limit);
    }
    async createStudent(studentData: IStudentsModel): Promise<IStudentsModel> {
        this.logInfo(`Inserting Student Data`);
        return this.studentServicesDbApi.createStudent(studentData);
    }
}