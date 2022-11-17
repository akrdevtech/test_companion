import React, { useContext } from 'react'
import { Chip, Grid } from '@mui/material'
import { CourseContext } from '../../../context/Store';
import PaginationButtons, { EPaginationPageChangeModes } from '../../../../../common/components/PaginationButtons';
import CourseFilters from './CourseFilters';
import { CourseActionTypes } from '../../../context/Actions';
import { ICourseListFilters } from '../../../../../common/interface/course';

const AppliedCourseFilters = () => {
    const { state, dispatch } = useContext(CourseContext);
    const { appliedCourseListFilters, courseListPagination } = state;

    const {
        status,
        search,
    } = appliedCourseListFilters;

    const handleDelete = (field: string) => {
        let value = 'any'
        switch (field) {
            case 'search': value = ''; break;
            default: value = 'any'; break;
        }
        dispatch({
            type: CourseActionTypes.COURSE_LIST_FILTER_CHANGE,
            payload: {
                appliedCourseListFilters: { ...appliedCourseListFilters, [field]: value } as ICourseListFilters,
            }
        })
    }

    const handlePageChange = (mode: EPaginationPageChangeModes): void => {
        if (mode === EPaginationPageChangeModes.INC) {
            dispatch({
                type: CourseActionTypes.STUDENT_LIST_PAGINATION_CHANGE,
                payload: {
                    courseListPagination: { ...courseListPagination, page: courseListPagination.page + 1 },
                }
            })
        } else {
            dispatch({
                type: CourseActionTypes.STUDENT_LIST_PAGINATION_CHANGE,
                payload: {
                    courseListPagination: { ...courseListPagination, page: courseListPagination.page - 1 },
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
                <CourseFilters />
                {status !== 'any' &&
                    <Chip size="small" label={`Status : ${status}`} variant="outlined" onDelete={() => handleDelete('status')} />}
                {search !== '' &&
                    <Chip size="small" label={`Search : ${search}`} variant="outlined" onDelete={() => handleDelete('search')} />}
            </Grid>
            <Grid item xs={12} lg={2} sx={{ textAlign: "right" }}>
                <PaginationButtons
                    currentPage={courseListPagination?.page || 0}
                    numberOfPages={courseListPagination?.totalPages || 0}
                    handlePageChange={handlePageChange}
                />
            </Grid>
        </Grid>
    )
}

export default AppliedCourseFilters