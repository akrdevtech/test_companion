import { CourseStatus } from '../enums/course';
import { ObjectId } from 'mongodb';

export interface ICourseModel {
    _id?: string | ObjectId;
    courseId: string;
    courseName: string;
    duration: number;
    fee: number;
    totalCredits: number;
    minCredits: number;
    status: CourseStatus;
    studentsAttending: number;
    studentsGraduated: number;
}