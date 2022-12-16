import { EStudentAdmissionFilter, EStudentGraduationFilter, EStudentPresenceFilter } from "../../../enums/student";

export interface IGetPaginatedStudentListRequestSchema {
    page: number;
    limit: number;
    admission: EStudentAdmissionFilter;
    graduation: EStudentGraduationFilter;
    presence: EStudentPresenceFilter;
    course: string;
    search?: string;
}

export interface IGetPaginatedStudentListFiltersSchema {
    admission: EStudentAdmissionFilter;
    graduation: EStudentGraduationFilter;
    presence: EStudentPresenceFilter;
    course: string;
    search: string;
}