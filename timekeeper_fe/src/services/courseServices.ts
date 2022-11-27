import { IAddCourseWizardState, ICourse, ICourseListFilters } from "../common/interface/course";
import { IListPagination } from "../common/interface/global";
import APIs from "./apis";
import { IPaginatedData } from "./models/common/interfaces";
import { addCourseWizardStateFormSchemaToCreateCourseRequestSchema } from "./models/rest/course/createCourse";

const createCourse = (courseData: IAddCourseWizardState['forms']): Promise<ICourse> => {
    const createCourseData = addCourseWizardStateFormSchemaToCreateCourseRequestSchema(courseData)
    return APIs.courseAPIs().createCourse(createCourseData)
}

const getPaginatedCourseList =
    (courseListPagination: IListPagination, appliedCourseListFilters: ICourseListFilters)
        : Promise<IPaginatedData<ICourse>> => {
        return APIs.courseAPIs().getPaginatedCourseList(courseListPagination, appliedCourseListFilters);
    }

const courseServices = {
    createCourse,
    getPaginatedCourseList,
}

export default courseServices;