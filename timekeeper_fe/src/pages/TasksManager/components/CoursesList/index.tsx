import React, { useContext } from 'react'
import Fab from '@mui/material/Fab';
import CourseListItem from './components/CourseListItem'
import { Grid, useTheme } from '@mui/material'
import NoSearchResults from '../../../../common/icons/placeholders/NoSearchResults';
import AppliedCourseFilters from './components/AppliedCourseFilters';
import FilledAddCourseIcon from '../../../../common/icons/custom/FilledAddCourseIcon';
import { CourseContext } from '../../context/Store';
import { CourseActionTypes } from '../../context/Actions';
import { ICourse } from '../../../../common/interface/course';

interface ICourseListProps {
    coursesList: ICourse[];
    selectedCourseId: string | null | undefined;
    handleSelectCourseId: (thisCourseId: string) => void;
}
const CourseList = (props: ICourseListProps) => {
    const theme = useTheme()

    const { coursesList, selectedCourseId, handleSelectCourseId } = props;

    const { dispatch } = useContext(CourseContext)

    const handleAddStudentWizardOpen = () => {
        dispatch({
            type: CourseActionTypes.ADD_COURSE_WIZARD_OPEN,
            payload: {}
        })
    }
    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" >
            <Grid item xs={12} lg={12} sx={{ paddingBottom: 2, marginTop: 2 }}>
                <AppliedCourseFilters />
            </Grid>
            <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                    {
                        coursesList.length ? (coursesList.map(courseInfo => (
                            <Grid item xs={11} lg={6} key={courseInfo._id} >
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
            <Fab
                color='primary'
                size="large"
                variant='circular'
                sx={{ position: "absolute", bottom: theme.spacing(2), right: "33%", textAlign: 'center' }}
                onClick={() => handleAddStudentWizardOpen()}
            >
                <FilledAddCourseIcon />
            </Fab>
        </Grid>
    )
}

export default CourseList