import { TaskModes } from '../enums/task';
import { ObjectId } from 'mongodb';

export interface ITaskAnswerKeyModel {
    qNumber: string;
    question?: string;
    answer?: string;
}
export interface ITaskModel {
    _id?: string | ObjectId;
    title: string;
    code: string;
    contents: string;
    description?: string;
    mode: TaskModes;
    answerKey?: ITaskAnswerKeyModel[];
}