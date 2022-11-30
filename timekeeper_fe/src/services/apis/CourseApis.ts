import { ICourse, ICourseListFilters } from "../../common/interface/course";
import { IListPagination } from "../../common/interface/global";
import { IPaginatedData } from "../models/common/interfaces";
import { ICreateCourseRequestSchema } from "../models/rest/course/createCourse";
import { IGetCourseMenuListResponseSchema } from "../models/rest/course/getCourseMenuList";
import { IGetPaginatedCourseListResponseSchema } from "../models/rest/course/getPaginatedCourseList";
import { BaseApiClient, IBaseApiClientConfigs } from "./BaseApiClient";

export class CourseAPIs extends BaseApiClient {
  protected basePath: string;

  constructor(baseApiClientConfigs: IBaseApiClientConfigs, basePath?: string) {
    super(baseApiClientConfigs)
    this.basePath = basePath || '/courses';
  }

  async createCourse(createData: ICreateCourseRequestSchema): Promise<ICourse> {
    const responseData = await this.postCall<ICreateCourseRequestSchema, ICourse>(`${this.basePath}`, createData);
    if (!responseData) throw new Error(`Error Fetching Bundle Details`);
    return responseData;
  }

  async getPaginatedCourseList(courseListPagination: IListPagination, appliedCourseListFilters: ICourseListFilters)
    : Promise<IPaginatedData<ICourse>> {
    const { page, limit } = courseListPagination;
    const { status, search } = appliedCourseListFilters;
    let reqUrl = `${this.basePath}?page=${page}&limit=${limit}`
    if (search?.length) {
      reqUrl = `${reqUrl}&search=${search}`
    }
    if (status && status !== 'any') {
      reqUrl = `${reqUrl}&status=${status}`
    }
    const responseData = await this.getCall<IGetPaginatedCourseListResponseSchema>(reqUrl);
    if (!responseData) throw new Error(`Error Fetching Bundle Details`);
    return responseData.coursesList;
  }
  async getCourseMenuList(): Promise<Partial<ICourse>[]> {
    const reqUrl = `${this.basePath}/menu`;
    const responseData = await this.getCall<IGetCourseMenuListResponseSchema>(reqUrl);
    if (!responseData) throw new Error(`Error Fetching Bundle Details`);
    return responseData.courseMenuList;
  }
}