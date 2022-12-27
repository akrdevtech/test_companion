import { IStudentsDbApi, StudentsDbApi } from "../../vendors/mongo/StudentsDbApi";
import { IAppConfig } from "../../config";
import { BaseService } from "../BaseService";
import { IAppFeatures } from "../../interfaces/AppFeatures";
import { IDbPaginatedData } from "../../vendors/mongo/BaseMongoClient";
import { IStudentsModel } from "../../interfaces/Students";
import { IGetPaginatedStudentListFiltersSchema } from "../../models/rest/student/getPaginatedStudentList";
import { ValidationError } from "@akrdevtech/lib-error-handler-middleware";
export interface IStudentService {
    getPaginatedStudentList(page: number, limit: number, filters: IGetPaginatedStudentListFiltersSchema): Promise<IDbPaginatedData<IStudentsModel>>;
    createStudent(studentData: IStudentsModel): Promise<IStudentsModel>;
    deleteStudent(studentId: string): Promise<boolean>;
    getStudentById(studentId: string): Promise<IStudentsModel>;
    activateStudent(studentId: string, studentInfo: IStudentsModel): Promise<boolean>;
    deActivateStudent(studentId: string, studentInfo: IStudentsModel): Promise<boolean>;
    studentGraduateCourse(studentId: string, updateData: Partial<IStudentsModel>): Promise<boolean>;
    studentPursueCourse(studentId: string, updateData: Partial<IStudentsModel>): Promise<boolean>;
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
        const { email } = studentData.contactInfo;
        const existingStudent = await this.studentServicesDbApi.getStudentByEmail(email);
        if (existingStudent) {
            throw new ValidationError(`Student with email ${email} already exists`);
        }
        return this.studentServicesDbApi.createStudent(studentData);
    }
    async getStudentById(studentId: string): Promise<IStudentsModel> {
        this.logInfo(`Fetching Student :${studentId}`);
        const existingStudent = await this.studentServicesDbApi.getStudentById(studentId);
        if (!existingStudent) {
            throw new ValidationError(`Student with id ${studentId} doesnot exists`);
        }
        return existingStudent;
    }
    async deleteStudent(studentId: string): Promise<boolean> {
        this.logInfo(`Deleting Student :${studentId}`);
        return this.studentServicesDbApi.deleteStudentById(studentId);
    }
    async activateStudent(studentId: string, studentInfo: IStudentsModel): Promise<boolean> {
        this.logInfo(`Activating Student :${studentId}`);
        const updateData: Partial<IStudentsModel> = {
            settings: {
                ...studentInfo.settings,
                isActive: true,
            }
        }
        return this.studentServicesDbApi.updateStudentById(studentId, updateData);
    }
    async deActivateStudent(studentId: string, studentInfo: IStudentsModel): Promise<boolean> {
        this.logInfo(`Activating Student :${studentId}`);
        const updateData: Partial<IStudentsModel> = {
            settings: {
                ...studentInfo.settings,
                isActive: false,
                isPresent: false,
            }
        }
        return this.studentServicesDbApi.updateStudentById(studentId, updateData);
    }
    async studentGraduateCourse(studentId: string, studentInfo: IStudentsModel): Promise<boolean> {
        this.logInfo(`Course Graduatd by Student :${studentId}`);
        const updateData: Partial<IStudentsModel> = {
            settings: {
                ...studentInfo.settings,
                hasGraduated: true,
            }
        }
        return this.studentServicesDbApi.updateStudentById(studentId, updateData);
    }
    async studentPursueCourse(studentId: string, studentInfo: IStudentsModel): Promise<boolean> {
        this.logInfo(`Course Pursued by Student :${studentId}`);
        const updateData: Partial<IStudentsModel> = {
            settings: {
                ...studentInfo.settings,
                hasGraduated: false,
            }
        }
        return this.studentServicesDbApi.updateStudentById(studentId, updateData);
    }
}