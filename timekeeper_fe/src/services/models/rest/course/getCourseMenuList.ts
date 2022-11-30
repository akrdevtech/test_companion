import { ICourse } from "../../../../common/interface/course";
import { IGenericApiResponseSchema } from "../../common/interfaces";

export interface IGetCourseMenuListResponseSchema extends IGenericApiResponseSchema {
    courseMenuList: Partial<ICourse>[];
}