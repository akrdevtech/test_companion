export interface ICreateCourseRequestSchema {
    courseId: string;
    courseName: string;
    duration: number;
    fee: number;
    totalCredits: number;
    minCredits: number;
}