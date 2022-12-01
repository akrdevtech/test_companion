import { ObjectId } from 'mongodb';
export interface ICourseEnrollmentsModel {
    _id?: ObjectId;
    courseId: string;
    year: number;
    month: number;
    enrolled: number;
}