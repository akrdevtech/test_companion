import { IStudentState } from "../../../common/interface/student";
import { StudentActions, StudentActionsPayload, StudentActionTypes } from "./Actions";

export const StudentReducer = (state: IStudentState, action: StudentActions) => {
    switch (action.type) {
        case StudentActionTypes.APP_DRAWER_SELECT_PAGE:
            return {
                ...state,
            }
        case StudentActionTypes.STUDENT_LIST_GET_UPDATED:
            return {
                ...state,
                studentListPagination: action.payload.studentListPagination,
                studentsList: action.payload.studentsList,
                refreshStudentList: action.payload.refreshStudentList,
            }
        case StudentActionTypes.GENERIC_SNACKBAR_OPEN:
            return {
                ...state,
            }
        case StudentActionTypes.GENERIC_SNACKBAR_CLOSE:
            return {
                ...state,
            }
        default:
            return state;
    }
}
