import React, { useContext, useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Alert, Button, Grid, IconButton, InputAdornment, Snackbar, TextField, Typography } from '@mui/material'
import PageHeader from '../../common/components/PageHeader'
import { EPageTitles } from '../../common/enums/global';
import { StudentContext } from './context/Store';
import StudentsList from './components/StudentsList'
import { AddStudentWizardStore } from './components/AddStudentWizard/components/data/context/Store';
import AddStudentWizard from './components/AddStudentWizard';
// import StudentProfile from './components/StudentProfile'
// import AddStudentWizard from './components/AddStudentWizard';
// import studentApis from '../../api/studentServices';
// import { StudentContext } from './Store'
// import StudentActions from "./Actions";
// import PageHeader from '../../components/common/PageHeader';

const StudentManager = () => {
    const { state, dispatch } = useContext(StudentContext);

    const {
        isAddStudentWizardOpen,
        studentsList,
        studentListPagination,
        selectedStudentId,
        selectedStudentInfo,
        appliedStudentListFilters,
        studentDetailsActiveTab,
        refreshStudentList
    } = state;

    const breadCrumbs = [
        {
            label: "Home",
            icon: <HomeIcon fontSize='small' />,
            link: '/students'
        }
    ]

    const [searchText, setSearchText] = useState(appliedStudentListFilters.search);

    const handleInputChange = (field: string, value: string) => {
        setSearchText(value)
    }

    const handleSearch = () => {
        // const newAppliedFilters = { ...appliedStudentListFilters, search: searchText };
        // dispatch({
        //     type: StudentActions.STUDENT_LIST_FILTER_TRAY.APPLY_FILTERS,
        //     payload: { appliedStudentListFilters: newAppliedFilters }
        // })
    }
    const togglerFilterView = () => {
        // dispatch({
        //     type: StudentActions.STUDENT_LIST_FILTER_TRAY.TOGGLE
        // })
    }
    const openAddStudentWizard = () => {
        // dispatch({ type: StudentActions.STUDENT_WIZARD.OPEN });
    };
    const handleSelectStudentId = (thisStudentId: string) => {
        // const thisStudent = studentsList.find(stud => stud.id === thisStudentId);
        // dispatch({
        //     type: StudentActions.STUDENTS_LIST.SELECT_STUDENT,
        //     payload: {
        //         selectedStudentId: thisStudentId,
        //         selectedStudentInfo: thisStudent,
        //         activeTabName: 'profile'
        //     }
        // });
    }


    return (
        <AddStudentWizardStore>
            <Grid container direction="row">
                <Grid item xs={12} lg={8} sx={{ backgroundColor: "#F5F8FB", padding: 2, minHeight: window.innerHeight }}>
                    <PageHeader breadCrumbs={breadCrumbs} handleBreadCrumbsClick={() => { }} pageTitle={EPageTitles.STUDENTS} >
                        {/* <Grid item xs={12} sx={{ paddingBottom: 2, paddingTop: 2 }}>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item xs={7}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size='small'
                                    value={searchText}
                                    onChange={(e) => handleInputChange("search", e.target.value)}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton color="primary" onClick={() => handleSearch()}>
                                                    <SearchOutlinedIcon />
                                                </IconButton>
                                            </InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    onClick={() => togglerFilterView()}
                                    variant='outlined'
                                    sx={{ height: 40, marginLeft: 2 }}
                                >
                                    <FilterAltIcon />
                                </Button>
                            </Grid>
                            <Grid item xs={3} justifyContent="flex-end">
                                <Button
                                    variant='contained'
                                    sx={{ height: 40, float: "right" }}
                                    onClick={openAddStudentWizard}
                                >
                                    Add Student
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid> */}
                        <Grid item xs={12} sx={{ maxHeight: '85vh', overflowY: 'auto' }}>
                            <StudentsList
                                studentsList={studentsList}
                                selectedStudentId={selectedStudentId}
                                handleSelectStudentId={handleSelectStudentId}
                            />
                        </Grid>
                    </PageHeader>
                </Grid>
                <Grid item xs={12} lg={4} sx={{ minHeight: window.innerHeight }}>
                    {/* <StudentProfile
                    selectedStudentInfo={selectedStudentInfo}
                    studentDetailsActiveTab={studentDetailsActiveTab}
                    changeStudentDetailsActiveTab={changeStudentDetailsActiveTab}
                /> */}
                </Grid>
                <AddStudentWizard />
                {/* <Snackbar
                open={snackBarAttributes.open}
                autoHideDuration={6000}
                onClose={handleSnackBarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert onClose={handleSnackBarClose} severity={snackBarAttributes.severity} sx={{ width: '100%' }}>
                    {snackBarAttributes.message}
                </Alert>
            </Snackbar> */}
            </Grid>
        </AddStudentWizardStore>
    )
}

export default StudentManager