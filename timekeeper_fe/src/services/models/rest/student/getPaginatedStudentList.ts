import { IStudentsModel } from "../../../../common/interface/student";
import { IGenericApiResponseSchema, IPaginatedData } from "../../common/interfaces";

export interface IGetPaginatedStudentListResponseSchema extends IGenericApiResponseSchema {
    studentsList: IPaginatedData<IStudentsModel>;
}