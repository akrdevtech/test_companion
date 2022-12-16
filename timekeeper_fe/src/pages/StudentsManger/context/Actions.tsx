import { EStudentDetailTabs } from "../../../common/enums/student";
import { IListPagination } from "../../../common/interface/global";
import { IStudentListFilters, IStudentsModel } from "../../../common/interface/student";
import { ActionMap } from "../../../common/types/global";

export type StudentActions = ActionMap<StudentActionsPayload>[keyof ActionMap<StudentActionsPayload>];
export enum StudentActionTypes {
    APP_DRAWER_SELECT_PAGE = 'APP-DRAWER-SELECT-PAGE',
    GENERIC_SNACKBAR_OPEN = 'GENERIC-SNACKBAR-OPEN',
    GENERIC_SNACKBAR_CLOSE = 'GENERIC-SNACKBAR-CLOSE',
    STUDENT_LIST_GET_UPDATED = 'STUDENT-LIST-GET-UPDATED',
    STUDENTS_LIST_SELECT_STUDENT = 'STUDENTS-LIST-SELECT-STUDENT',
    STUDENT_LIST_FILTER_CHANGE = 'STUDENT-LIST-FILTER-CHANGE'
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
    [StudentActionTypes.APP_DRAWER_SELECT_PAGE]: {
    };
    [StudentActionTypes.GENERIC_SNACKBAR_OPEN]: {

    };
    [StudentActionTypes.GENERIC_SNACKBAR_CLOSE]: {};
}
