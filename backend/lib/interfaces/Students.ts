import { ObjectId } from 'mongodb';

export interface IDbStudents {
    _id?: string | ObjectId;
    firstName: string;
    lastName?: string;
    createdAt: Date;
    updatedAt: Date;
}