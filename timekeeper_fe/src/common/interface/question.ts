import { IQuestionTypes } from "../enums/question";

export interface IQuestionsModel {
    _id?: string;
    question: string;
    type: IQuestionTypes;
    choices: string[];
    answer: string;
}