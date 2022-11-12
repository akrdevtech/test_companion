import React, { createContext, useReducer, Dispatch, ReactNode } from 'react';
import { EAlertSeverity, EAppPages } from '../enums/global';
import { IGobalState } from '../interface/global';
import { GlobalActions } from './Actions';
import { GlobalReducer } from './Reducers';

const initialState: IGobalState = {
    selectedPage: EAppPages.DASHBOARD,
    genericSnackBar: {
        open: false,
        duration: 3000,
        message: 'Done',
        severity: EAlertSeverity.SUCCESS,
        handleClose: () => { },
    }
};

const GlobalContext = createContext<{ state: IGobalState; dispatch: Dispatch<GlobalActions> }>({
    state: initialState,
    dispatch: () => null
});

const mainReducer = (initialState: IGobalState, action: GlobalActions) => GlobalReducer(initialState, action);

type AppProps = { children: ReactNode };

const GlobalStore = ({ children }: AppProps) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalStore, GlobalContext };