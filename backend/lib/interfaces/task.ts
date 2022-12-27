import { ObjectId } from 'mongodb';
import { TaskModes } from '../enums/task';
import { IQuestionsModel } from './questions';

interface IQuestionBank extends IQuestionsModel {
    questionNumber: string;
}
interface ITaskContentBlock {
    contentIndex: number;
    content: string;
    attachments?: string[];
    questionBank: IQuestionBank[];
}
export interface ITaskModel {
    _id?: ObjectId;
    title: string;
    code: string;
    mode: TaskModes;
    duration: number;
    totalScore: number;
    minimunScore: number;
    createdAt: Date;
    updatedAt: Date;
    description?: string;
    attachments?: string[];
    contentBlocks: ITaskContentBlock[];
}