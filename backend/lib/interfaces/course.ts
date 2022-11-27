import { CourseStatus } from '../enums/course';
import { ObjectId, Document } from 'mongodb';

export interface ICourseModel extends Document {
    _id?: ObjectId;
    courseId: string;
    courseName: string;
    duration: number;
    fee: number;
    totalCredits: number;
    minCredits: number;
    status: CourseStatus;
    studentsAttending: number;
    studentsGraduated: number;
    createdAt: Date;
    updatedAt: Date;
}