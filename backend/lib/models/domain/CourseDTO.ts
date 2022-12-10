import { CourseStatus } from "../../enums/course";
import { ObjectId, Document } from 'mongodb';
import { ICourseModel } from "../../interfaces/course";
import { ICreateCourseRequestSchema } from "../rest/course/createCourse";

export class CourseDTO {
    constructor() { }
    public fromCreateRequestToDb(raw: ICreateCourseRequestSchema, courseCode: number): ICourseModel {
        const {
            courseId,
            courseName,
            duration,
            fee,
            minCredits,
            totalCredits
        } = raw;
        const today = new Date();
        return {
            courseId,
            code: courseCode,
            courseName,
            duration: duration ? Number(duration) : 0,
            fee: fee ? Number(fee) : 0,
            minCredits: minCredits ? Number(minCredits) : 0,
            status: CourseStatus.ACTIVE,
            totalCredits: totalCredits ? Number(totalCredits) : 0,
            studentsAttending: 0,
            studentsGraduated: 0,
            createdAt: today,
            updatedAt: today,
        }
    }
}