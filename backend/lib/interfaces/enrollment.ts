import { ObjectId } from 'mongodb';
export interface ICourseEnrollmentsModel {
    _id?: string | ObjectId;
    courseId: string;
    year: number;
    month: number;
    enrolled: number;
}