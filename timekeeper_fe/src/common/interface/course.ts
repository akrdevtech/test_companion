import { ECourseDetailTabs, ECourseStatus } from "../enums/course";
import { IListPagination } from "./global";
import { IStudent } from "./student";

export interface ICourse {
    _id: string;
    name: string;
}

export interface ICourseListFilters {
    status?: ECourseStatus | null | undefined | 'any';
    search?: string;
}
export interface ICourseState {
    coursesList: ICourse[];
    refreshCourseList: boolean;
    selectedCourseId: string | null | undefined;
    selectedCourseInfo: ICourse | null | undefined;
    isAddCourseWizardOpen: boolean;
    courseListPagination: IListPagination;
    courseDetailsActiveTab: ECourseDetailTabs;
    courseDetailsStudents: {
        studentList: IStudent[];
        pagination: IListPagination;
        refreshStudentList: boolean;
        selectedStudentInCourseInfo: IStudent | null | undefined;
    }
    appliedCourseListFilters: ICourseListFilters
}