import { EAppPages } from "../enums/global";
import { AlertColor } from '@mui/lab';

export interface IGenericSnackBar {
    open: boolean;
    duration: number;
    message: string;
    severity: AlertColor;
    handleClose: Function;
}
export interface IGobalState {
    selectedPage: EAppPages;
    genericSnackBar: IGenericSnackBar;
}
export interface IListPagination {
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
}
export interface IWizardFormFields<T> {
    value?: T;
    error?: string | null | undefined;
}