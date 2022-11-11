import { AppPages } from "../enums/global";
import { ActionMap } from "../types/global";

export type GlobalActions = ActionMap<GlobalActionsPayload>[keyof ActionMap<GlobalActionsPayload>];

export type GlobalActionsPayload = {
    [GlobalActionTypes.APP_DRAWER_SELECT_PAGE]: {
        selectedPage: AppPages;
    };
    [GlobalActionTypes.GENERIC_SNACKBAR_OPEN]: {
        duration?: number;
        message?: string;
        handleClose?: Function;
    };
    [GlobalActionTypes.GENERIC_SNACKBAR_CLOSE]: {};
}

export enum GlobalActionTypes {
    APP_DRAWER_SELECT_PAGE = 'APP-DRAWER-SELECT-PAGE',
    GENERIC_SNACKBAR_OPEN = 'GENERIC-SNACKBAR-OPEN',
    GENERIC_SNACKBAR_CLOSE = 'GENERIC-SNACKBAR-CLOSE',
}
