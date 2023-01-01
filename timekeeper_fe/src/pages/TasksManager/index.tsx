import { Grid } from '@mui/material'
import React from 'react'
import PageHeader from '../../common/components/PageHeader'
import { EPageTitles } from '../../common/enums/global'
import HomeIcon from '@mui/icons-material/Home';
import TaskDetails from './components/TaskDetails';

const breadCrumbs = [
    {
        label: "Home",
        icon: <HomeIcon fontSize='small' />,
        link: '/tasks'
    }
]

const TasksManager = () => {
    return (
        <Grid container direction="row">
            <Grid item xs={12} lg={8} sx={{ backgroundColor: "#F5F8FB", padding: 2, minHeight: window.innerHeight }}>
                <PageHeader breadCrumbs={breadCrumbs} handleBreadCrumbsClick={() => { }} pageTitle={EPageTitles.TASKS} >
                    <Grid item xs={12}>
                        {/* <TaskList
                            coursesList={coursesList}
                            selectedCourseId={selectedCourseId}
                            handleSelectCourseId={handleSelectCourseId}
                        /> */}
                    </Grid>
                </PageHeader>
            </Grid>
            <Grid item xs={12} lg={4} sx={{ minHeight: window.innerHeight }}>
                <TaskDetails/>
            </Grid>
        </Grid>
    )
}

export default TasksManager