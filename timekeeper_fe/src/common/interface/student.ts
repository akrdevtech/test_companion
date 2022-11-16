import { EStudentAdmissionFilter, EStudentDetailTabs, EStudentGraduationFilter, EStudentPresenceFilter } from "../enums/student";
import { IListPagination } from "./global";

export interface IStudent {
    _id: string;
    firstName: string;
}

export interface IAttendance {
    clockedIn: Date;
    clockedOut?: Date;
}

export interface IStudentListFilters {
    admission: EStudentAdmissionFilter;
    graduation: EStudentGraduationFilter;
    presence: EStudentPresenceFilter;
    course: string;
    search?: string;
}

export interface IStudentState {
    studentsList?: IStudent[];
    refreshStudentList: boolean;
    selectedStudentId?: string | undefined;
    selectedStudentInfo?: IStudent | undefined;
    selectedStudentAttendance: {
        selectedYear: number;
        selectedMonth: number;
        selectedMonthAttendance?: IAttendance[],
        selectedDate?: Date | null;
        clockedIn?: Date | null;
        clockedOut?: Date | null;
        totalAttendance: number;
        thisMonthAttendance: number;
        refreshAttendanceCalendar: boolean;
    },
    isAddStudentWizardOpen: boolean;
    studentListPagination: IListPagination;
    appliedStudentListFilters: IStudentListFilters;
    filterTrayToggle: boolean;
    studentDetailsActiveTab: EStudentDetailTabs
}