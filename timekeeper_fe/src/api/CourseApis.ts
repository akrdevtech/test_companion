import { ICourse } from "../common/interface/course";
import { BaseApiClient, IBaseApiClientConfigs } from "./BaseApiClient";
import { ICreateCourseRequestSchema } from "./models/rest/course/createCourse";

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
}