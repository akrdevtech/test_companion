import { CourseStatus } from "../../../enums/course";

export interface IGetPaginatedCourseListRequestSchema {
    page: number;
    limit: number;
    search?: string;
    status?: CourseStatus;
}

export interface IGetPaginatedCourseListFiltersSchema {
    search: string;
    status: CourseStatus;
}