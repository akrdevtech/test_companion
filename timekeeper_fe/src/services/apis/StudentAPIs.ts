import { IListPagination } from "../../common/interface/global";
import { IStudentListFilters, IStudentsModel } from "../../common/interface/student";
import { IPaginatedData } from "../models/common/interfaces";
import { ICreateStudentRequestSchema } from "../models/rest/student/createStudent";
import { IGetPaginatedStudentListResponseSchema } from "../models/rest/student/getPaginatedStudentList";
import { BaseApiClient, IBaseApiClientConfigs } from "./BaseApiClient";

export class StudentAPIs extends BaseApiClient {
    protected basePath: string;

    constructor(baseApiClientConfigs: IBaseApiClientConfigs, basePath?: string) {
        super(baseApiClientConfigs)
        this.basePath = basePath || '/students';
    }

    async fetchUserData(): Promise<any> {
        const responseData = await this.getCall<any>(`/healthcheck`);
        if (!responseData) throw new Error(`Error Fetching Bundle Details`);
        return responseData;
    }

    async getAutogeneratedAdmissionNumber(courseId: string, dateOfAdmission: Date): Promise<string> {
        const reqUrl = `${this.basePath}/admno?courseId=${courseId}&dateOfAdmission=${dateOfAdmission.toISOString()}`
        const responseData = await this.getCall<any>(reqUrl);
        if (!responseData) throw new Error(`Error generating Admission number`);
        return responseData.admissionNumber;
    }

    async createStudent(createData: ICreateStudentRequestSchema): Promise<IStudentsModel> {
        const responseData = await this.postCall<ICreateStudentRequestSchema, IStudentsModel>(`${this.basePath}`, createData);
        if (!responseData) throw new Error(`Error Creating Student`);
        return responseData;
    }

    async getPaginatedStudentList(studentListPagination: IListPagination, appliedStudentListFilters: IStudentListFilters)
        : Promise<IPaginatedData<IStudentsModel>> {
        const { page, limit } = studentListPagination;
        const { admission, course, graduation, presence, search } = appliedStudentListFilters;
        let reqUrl = `${this.basePath}?page=${page}&limit=${limit}`
        if (search?.length) {
            reqUrl = `${reqUrl}&search=${search}`
        }
        if (admission && admission !== 'any') {
            reqUrl = `${reqUrl}&admission=${admission}`
        }
        if (graduation && graduation !== 'any') {
            reqUrl = `${reqUrl}&graduation=${graduation}`
        }
        if (presence && presence !== 'any') {
            reqUrl = `${reqUrl}&presence=${presence}`
        }
        if (course && course !== 'any') {
            reqUrl = `${reqUrl}&course=${course}`
        }
        const responseData = await this.getCall<IGetPaginatedStudentListResponseSchema>(reqUrl);
        if (!responseData) throw new Error(`Error Fetching Student Details`);
        return responseData.studentsList;
    }
}