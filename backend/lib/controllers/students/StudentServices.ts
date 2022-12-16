import { IStudentsDbApi, StudentsDbApi } from "../../vendors/mongo/StudentsDbApi";
import { IAppConfig } from "../../config";
import { BaseService } from "../BaseService";
import { IAppFeatures } from "../../interfaces/appFeatures";
import { IDbPaginatedData } from "../../vendors/mongo/BaseMongoClient";
import { IStudentsModel } from "../../interfaces/students";
import { IGetPaginatedStudentListFiltersSchema } from "../../models/rest/student/getPaginatedStudentList";

export interface IStudentService {
    getPaginatedStudentList(page: number, limit: number, filters: IGetPaginatedStudentListFiltersSchema): Promise<IDbPaginatedData<IStudentsModel>>;
    createStudent(studentData: IStudentsModel): Promise<IStudentsModel>;
}

export class StudentService extends BaseService implements IStudentService {
    private studentServicesDbApi: IStudentsDbApi;

    constructor(appConfig: IAppConfig, appFeatures?: IAppFeatures) {
        super(appFeatures, { moduleName: "Student Service" });
        this.studentServicesDbApi = new StudentsDbApi(appConfig.mongoConfig, appFeatures);
    }

    async getPaginatedStudentList(page: number, limit: number, filters: IGetPaginatedStudentListFiltersSchema): Promise<IDbPaginatedData<IStudentsModel>> {
        this.logInfo(`Fetching Students List`);
        return this.studentServicesDbApi.getPaginatedStudentList(page, limit, filters);
    }
    async createStudent(studentData: IStudentsModel): Promise<IStudentsModel> {
        this.logInfo(`Inserting Student Data`);
        return this.studentServicesDbApi.createStudent(studentData);
    }
}