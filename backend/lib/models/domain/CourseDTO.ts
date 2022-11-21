import { CourseStatus } from "../../enums/course";
import { ObjectId, Document } from 'mongodb';
import { ICourseModel } from "../../interfaces/course";
import { ICreateCourseRequestSchema } from "../rest/course_post";

export class CourseDTO {
    constructor() { }
    public fromCreateRequestToDb(raw: ICreateCourseRequestSchema): ICourseModel {
        return {
            courseId: raw.courseId,
            courseName: raw.courseName,
            duration: raw.duration || 0,
            fee: raw.fee || 0,
            minCredits: raw.minCredits || 0,
            status: CourseStatus.ACTIVE,
            totalCredits: raw.totalCredits || 0,
            studentsAttending: 0,
            studentsGraduated: 0
        }
    }
}