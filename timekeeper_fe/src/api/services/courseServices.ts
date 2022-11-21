import APIs from "..";
import { IAddCourseWizardState, ICourse } from "../../common/interface/course";
import { addCourseWizardStateFormSchemaToCreateCourseRequestSchema } from "../models/rest/course/createCourse";

const createCourse = (courseData: IAddCourseWizardState['forms']): Promise<ICourse> => {
    const createCourseData = addCourseWizardStateFormSchemaToCreateCourseRequestSchema(courseData)
    return APIs.courseAPIs().createCourse(createCourseData)
}

const courseServices = {
    createCourse
}

export default courseServices;