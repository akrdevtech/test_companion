import React from 'react'
import CourseListItem from './components/CourseListItem'
import { Grid, useTheme } from '@mui/material'
// import AppliedFiltersContainer from './components/AppliedFiltersContainer';
// import FilterTray from './components/FilterTray';
import NoSearchResults from '../../../../common/icons/placeholders/NoSearchResults';
import AppliedCourseFilters from './components/AppliedCourseFilters';

const CourseList = (props) => {
    const theme = useTheme()

    const { coursesList, selectedCourseId, handleSelectCourseId } = props;
    return (
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={12} lg={12} sx={{ paddingBottom: 2, marginTop: 2 }}>
                <AppliedCourseFilters />
            </Grid>
            <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                    {
                        coursesList.length ? (coursesList.map(courseInfo => (
                            <Grid item xs={11} lg={6} key={courseInfo.id} >
                                <CourseListItem
                                    courseInfo={courseInfo}
                                    selectedCourseId={selectedCourseId}
                                    handleSelectCourseId={handleSelectCourseId}
                                />
                            </Grid>
                        ))) : (<Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ marginTop: '20%' }}
                        >
                            <NoSearchResults
                                sx={{ fontSize: 250, color: theme.palette.primary.main }} viewBox="0 0  250 250" opacity={0.2} />
                        </Grid>)
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CourseList