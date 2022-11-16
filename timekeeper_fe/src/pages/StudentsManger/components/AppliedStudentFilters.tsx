import React, { useContext } from 'react'
import { Chip, Grid } from '@mui/material'
import PaginationButtons from '../../../common/components/PaginationButtons'
// import PaginationButtons from '../../../../../../components/common/PaginationButtons'
import { StudentContext } from '../context/Store';
// import StudentActions from '../../../../Actions';
import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
import StudentFilters from './StudentFilters';

const AppliedStudentFilters = () => {
    const { state, dispatch } = useContext(StudentContext);
    const { appliedStudentListFilters, studentListPagination } = state;

    const {
        admission,
        graduation,
        presence,
        course,
        search,
    } = appliedStudentListFilters;

    const handleDelete = (field: string) => {
        let value = 'any'
        switch (field) {
            case 'search': value = ''; break;
            default: value = 'any'; break;
        }
        // dispatch({
        //     type: StudentActions.STUDENT_LIST_FILTER_TRAY.APPLY_FILTERS,
        //     payload: { appliedStudentListFilters: { ...appliedStudentListFilters, [field]: value } }
        // })
    }

    const handlePageChange = (mode: string): void => {
        if (mode === 'inc') {
            // dispatch({ type: StudentActions.STUDENT_LIST_PAGINATION.INCREMENT })
        } else {
            // dispatch({ type: StudentActions.STUDENT_LIST_PAGINATION.DECREMENT })
        }
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{
                backgroundColor: "white",
                borderRadius: 2,
                padding: 0.5,
            }}>
            <Grid item xs={12} lg={10}>
                <StudentFilters />
                {admission !== 'any' &&
                    <Chip size="small" label={`Admission : ${admission}`} variant="outlined" onDelete={() => handleDelete('admission')} />}
                {graduation !== 'any' &&
                    <Chip size="small" label={`Graduation : ${graduation}`} variant="outlined" onDelete={() => handleDelete('graduation')} />}
                {presence !== 'any' &&
                    <Chip size="small" label={`Presence : ${presence}`} variant="outlined" onDelete={() => handleDelete('presence')} />}
                {course !== 'any' &&
                    course !== '' &&
                    !course.includes('any') &&
                    <Chip size="small" label={`Course : ${course}`} variant="outlined" onDelete={() => handleDelete('course')} />}
                {search !== '' &&
                    <Chip size="small" label={`Search : ${search}`} variant="outlined" onDelete={() => handleDelete('search')} />}
            </Grid>
            <Grid item xs={12} lg={2} sx={{ textAlign: "right" }}>
                <PaginationButtons
                    currentPage={studentListPagination?.page || 0}
                    numberOfPages={studentListPagination?.totalPages || 0}
                    handlePageChange={handlePageChange}
                />
            </Grid>
        </Grid>
    )
}

export default AppliedStudentFilters