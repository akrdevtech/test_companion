import React from 'react'
import { IconButton, Typography } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export enum EPaginationPageChangeModes {
    INC = 'inc',
    DEC = 'dec',
}
interface IPaginationButtonsProps {
    currentPage: number;
    numberOfPages: number;
    handlePageChange: (mode: EPaginationPageChangeModes) => void;
}

const PaginationButtons = (props: IPaginationButtonsProps) => {
    let { currentPage, numberOfPages, handlePageChange } = props;
    return (
        <>
            <IconButton
                disabled={!currentPage} color='primary'
                onClick={() => handlePageChange(EPaginationPageChangeModes.DEC)}
            >
                <KeyboardArrowLeftIcon />
            </IconButton>
            <Typography variant="overline" color="textSecondary">
                <b>{numberOfPages ? currentPage + 1 : currentPage} &nbsp; of &nbsp; {numberOfPages}</b>
            </Typography>
            <IconButton
                disabled={!numberOfPages || currentPage + 1 === numberOfPages} color='primary'
                onClick={() => handlePageChange(EPaginationPageChangeModes.INC)}
            >
                <KeyboardArrowRightIcon />
            </IconButton>
        </>
    )
}

export default PaginationButtons