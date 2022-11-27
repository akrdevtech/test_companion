import { EAlertSeverity } from "../enums/global";
import { IGobalState } from "../interface/global";
import { GlobalActions, GlobalActionsPayload, GlobalActionTypes } from "./Actions";

export const GlobalReducer = (state: IGobalState, action: GlobalActions) => {
    switch (action.type) {
        case GlobalActionTypes.APP_DRAWER_SELECT_PAGE:
            return {
                ...state,
                selectedPage: action.payload.selectedPage,
            }
        case GlobalActionTypes.GENERIC_SNACKBAR_OPEN:
            return {
                ...state,
                genericSnackBar: {
                    ...state.genericSnackBar,
                    open: true,
                    duration: action.payload.duration || state.genericSnackBar.duration,
                    message: action.payload.message || state.genericSnackBar.message,
                    handleClose: action.payload.handleClose || state.genericSnackBar.handleClose,
                    severity: action.payload.severity || EAlertSeverity.SUCCESS,
                }
            }
        case GlobalActionTypes.GENERIC_SNACKBAR_CLOSE:
            return {
                ...state,
                genericSnackBar: {
                    ...state.genericSnackBar,
                    open: false,
                    message: "Done",
                }
            }
        default:
            return state;
    }
}
