import { ActionMap } from "../../../common/types/global";

export type StudentActions = ActionMap<StudentActionsPayload>[keyof ActionMap<StudentActionsPayload>];
export enum StudentActionTypes {
    APP_DRAWER_SELECT_PAGE = 'APP-DRAWER-SELECT-PAGE',
    GENERIC_SNACKBAR_OPEN = 'GENERIC-SNACKBAR-OPEN',
    GENERIC_SNACKBAR_CLOSE = 'GENERIC-SNACKBAR-CLOSE',
}
export type StudentActionsPayload = {
    [StudentActionTypes.APP_DRAWER_SELECT_PAGE]: {
    };
    [StudentActionTypes.GENERIC_SNACKBAR_OPEN]: {

    };
    [StudentActionTypes.GENERIC_SNACKBAR_CLOSE]: {};
}
