import { ObjectId } from 'mongodb';

export interface ITaskAttemptedAnswers {
    questionId: string;
    answer?: string;
}
export interface ITaskAttempts {
    startTime?: Date;
    endTime?: Date;
    duration: number;
    answers?: ITaskAttemptedAnswers[];
    score: string;
}
export interface ITaskPerformance {
    _id: ObjectId;
    taskId: string;
    studentId: string;
    duration: number;
    score: string;
    attempts: ITaskAttempts[];
}