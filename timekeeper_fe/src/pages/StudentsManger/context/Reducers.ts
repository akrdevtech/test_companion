import { IStudentState } from "../../../common/interface/student";
import { StudentActions, StudentActionsPayload, StudentActionTypes } from "./Actions";

export const StudentReducer = (state: IStudentState, action: StudentActions) => {
    switch (action.type) {
        case StudentActionTypes.APP_DRAWER_SELECT_PAGE:
            return {
                ...state,
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
