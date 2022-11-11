import { AppPages } from "../enums/global";
import { AlertColor } from '@mui/lab';

export interface IGenericSnackBar {
    open: boolean;
    duration: number;
    message: string;
    severity: AlertColor;
    handleClose: Function;
}

export interface IGobalState {
    selectedPage: AppPages;
    genericSnackBar: IGenericSnackBar;
}