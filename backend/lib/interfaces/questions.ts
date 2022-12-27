import { ObjectId } from 'mongodb';
import { IQuestionTypes } from "../enums/questions";

export interface IQuestionsModel {
    _id?: string | ObjectId;
    question: string;
    type: IQuestionTypes;
    choices: string[];
    answer: string;
}