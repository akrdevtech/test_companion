import { CourseStatus } from "../../enums/course";
import { ObjectId, Document } from 'mongodb';
import { ICourseModel } from "../../interfaces/course";
import { ICreateCourseRequestSchema } from "../rest/createCourse";

export class CourseDTO {
    constructor() { }
    public fromCreateRequestToDb(raw: ICreateCourseRequestSchema): ICourseModel {
        const {
            courseId,
            courseName,
            duration,
            fee,
            minCredits,
            totalCredits
        } = raw;
        return {
            courseId,
            courseName,
            duration: duration ? Number(duration) : 0,
            fee: fee ? Number(fee) : 0,
            minCredits: minCredits ? Number(minCredits) : 0,
            status: CourseStatus.ACTIVE,
            totalCredits: totalCredits ? Number(totalCredits) : 0,
            studentsAttending: 0,
            studentsGraduated: 0
        }
    }
}