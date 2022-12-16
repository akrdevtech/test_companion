import React, { useContext } from 'react'
import { Chip, Grid } from '@mui/material'
import { StudentContext } from '../context/Store';
import StudentFilters from './StudentFilters';
import { StudentActionTypes } from '../context/Actions';
import PaginationButtons, { EPaginationPageChangeModes } from '../../../common/components/PaginationButtons';

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
        dispatch({
            type: StudentActionTypes.STUDENT_LIST_FILTER_CHANGE,
            payload: { appliedStudentListFilters: { ...appliedStudentListFilters, [field]: value } }
        })
    }

    const handlePageChange = (mode: EPaginationPageChangeModes): void => {
        if (mode === EPaginationPageChangeModes.INC) {
            dispatch({
                type: StudentActionTypes.STUDENT_LIST_PAGINATION_CHANGE,
                payload: {
                    studentListPagination: { ...studentListPagination, page: studentListPagination.page + 1 },
                }
            })
        } else {
            dispatch({
                type: StudentActionTypes.STUDENT_LIST_PAGINATION_CHANGE,
                payload: {
                    studentListPagination: { ...studentListPagination, page: studentListPagination.page - 1 },
                }
            })
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