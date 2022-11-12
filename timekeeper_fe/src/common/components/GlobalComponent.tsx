import React, { useContext } from 'react'
import { GlobalActionTypes } from '../context/Actions';
import { GlobalContext } from "../context/Store";
import GenericSnackBar from './GenericSnackBar';

const GlobalComponent = () => {
    const { state, dispatch } = useContext(GlobalContext);
    const { genericSnackBar } = state;

    const handleSnackBarClose = () => {
        dispatch({ type: GlobalActionTypes.GENERIC_SNACKBAR_CLOSE, payload: {} })
    }

    // const handleSnackBarOpen = () => {
    //     dispatch({ type: GlobalActionTypes.GENERIC_SNACKBAR_OPEN, payload: {
    //         message: "Did it"
    //     } })
    // }

    return (
        <>
            <GenericSnackBar {...genericSnackBar} handleClose={handleSnackBarClose} />
        </>
    )
}

export default GlobalComponent