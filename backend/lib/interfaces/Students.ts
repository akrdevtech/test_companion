import { IUserModel, IUserSettingsModel } from './users';
export interface IStudentGaurdianModel {
    nameOfGaurdian: string;
    phoneOfGaurdian?: string;
}
export interface IStudentCourseModel {
    course: string;
    dateOfAdmission: Date;
    admissionNumber: string;
}
export interface IStudentSpeakingPerformanceModel {
    F: number;
    S: number;
    L: number;
    V: number;
}
export interface IStudentPerformanceModel {
    listening: number;
    speaking: number;
    reading: number;
    writing1: number;
    writing2: number;
    speakinAdvanced: IStudentSpeakingPerformanceModel;
}
export interface IStudentSettingsModel extends IUserSettingsModel {
    hasGraduated: boolean;
    isPresent: boolean;
    username?: string;
    password?: string;
}
export interface IStudentsModel extends IUserModel {
    occupation?: string;
    gaurdianInfo: IStudentGaurdianModel;
    courseInfo: IStudentCourseModel;
    performanceInfo: IStudentPerformanceModel;
    settings: IStudentSettingsModel;
}