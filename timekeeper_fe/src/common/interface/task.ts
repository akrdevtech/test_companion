import { TaskModes } from "../enums/task";
import { IListPagination } from "./global";
import { IQuestionsModel } from "./question";

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
    _id?: string;
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

export interface ITaskModelBase {
    _id?: string;
    title: string;
    code: string;
    mode: TaskModes;
    duration: number;
    totalScore: number;
    minimunScore: number;
    createdAt: Date;
    updatedAt: Date;
    description?: string;
}
export interface ITaskBaseListFilters {
    mode?: TaskModes | null | undefined | 'any';
    search?: string;
}

export interface ITaskState {
    taskBaseList: ITaskModelBase[];
    refreshTaskList: boolean;
    selectedTaskId: string | null | undefined;
    selectedTaskInfo: ITaskModelBase | null | undefined;
    taskBaseListPagination: IListPagination;
    appliedtaskBaseListFilters: ITaskBaseListFilters;
}
