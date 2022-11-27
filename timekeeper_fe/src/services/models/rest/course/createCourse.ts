import { IAddCourseWizardState } from "../../../../common/interface/course";

export interface ICreateCourseRequestSchema {
    courseId: string;
    courseName: string;
    duration: number;
    fee: number;
    totalCredits: number;
    minCredits: number;
}

export const addCourseWizardStateFormSchemaToCreateCourseRequestSchema =
    (formData: IAddCourseWizardState['forms']): ICreateCourseRequestSchema => {
        return {
            courseId: formData.basicInfo.courseId.value || "",
            courseName: formData.basicInfo.courseName.value || "",
            duration: formData.basicInfo.duration.value || 0,
            fee: formData.basicInfo.fee.value || 0,
            totalCredits: formData.basicInfo.totalCredits.value || 0,
            minCredits: formData.basicInfo.minCredits.value || 0,
        }
    }
