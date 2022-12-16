import { IListPagination } from "../../../common/interface/global";
import { IStudentsModel } from "../../../common/interface/student";
import { ActionMap } from "../../../common/types/global";

export type StudentActions = ActionMap<StudentActionsPayload>[keyof ActionMap<StudentActionsPayload>];
export enum StudentActionTypes {
    APP_DRAWER_SELECT_PAGE = 'APP-DRAWER-SELECT-PAGE',
    GENERIC_SNACKBAR_OPEN = 'GENERIC-SNACKBAR-OPEN',
    GENERIC_SNACKBAR_CLOSE = 'GENERIC-SNACKBAR-CLOSE',
    STUDENT_LIST_GET_UPDATED = 'STUDENT-LIST-GET-UPDATED'
}
export type StudentActionsPayload = {
    [StudentActionTypes.STUDENT_LIST_GET_UPDATED]: {
        studentListPagination: IListPagination,
        studentsList: IStudentsModel[],
        refreshStudentList: boolean,
    };
    [StudentActionTypes.APP_DRAWER_SELECT_PAGE]: {
    };
    [StudentActionTypes.GENERIC_SNACKBAR_OPEN]: {

    };
    [StudentActionTypes.GENERIC_SNACKBAR_CLOSE]: {};
}
