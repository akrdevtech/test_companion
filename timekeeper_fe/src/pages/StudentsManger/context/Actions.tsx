import { EStudentDetailTabs } from "../../../common/enums/student";
import { IListPagination } from "../../../common/interface/global";
import { IStudentListFilters, IStudentsModel } from "../../../common/interface/student";
import { ActionMap } from "../../../common/types/global";

export type StudentActions = ActionMap<StudentActionsPayload>[keyof ActionMap<StudentActionsPayload>];
export enum StudentActionTypes {
    APP_DRAWER_SELECT_PAGE = 'APP_DRAWER_SELECT_PAGE',
    GENERIC_SNACKBAR_OPEN = 'GENERIC_SNACKBAR_OPEN',
    GENERIC_SNACKBAR_CLOSE = 'GENERIC_SNACKBAR_CLOSE',
    STUDENT_LIST_GET_UPDATED = 'STUDENT_LIST_GET_UPDATED',
    STUDENTS_LIST_SELECT_STUDENT = 'STUDENTS_LIST_SELECT_STUDENT',
    STUDENT_LIST_FILTER_CHANGE = 'STUDENT_LIST_FILTER_CHANGE',
    STUDENT_LIST_PAGINATION_CHANGE = 'STUDENT_LIST_PAGINATION_CHANGE',
}
export type StudentActionsPayload = {
    [StudentActionTypes.STUDENT_LIST_GET_UPDATED]: {
        studentListPagination: IListPagination,
        studentsList: IStudentsModel[],
        refreshStudentList: boolean,
    };
    [StudentActionTypes.STUDENTS_LIST_SELECT_STUDENT]: {
        selectedStudentId?: string;
        selectedStudentInfo?: IStudentsModel;
        activeTabName: EStudentDetailTabs
    };
    [StudentActionTypes.STUDENT_LIST_FILTER_CHANGE]: {
        appliedStudentListFilters: IStudentListFilters
    };
    [StudentActionTypes.STUDENT_LIST_PAGINATION_CHANGE]: {
        studentListPagination: IListPagination
    };
    [StudentActionTypes.APP_DRAWER_SELECT_PAGE]: {
    };
    [StudentActionTypes.GENERIC_SNACKBAR_OPEN]: {

    };
    [StudentActionTypes.GENERIC_SNACKBAR_CLOSE]: {};
}
