import { ICourse } from "../../../../common/interface/course";
import { IGenericApiResponseSchema, IPaginatedData } from "../../common/interfaces";

export interface IGetPaginatedCourseListResponseSchema extends IGenericApiResponseSchema {
    coursesList: IPaginatedData<ICourse>;
}