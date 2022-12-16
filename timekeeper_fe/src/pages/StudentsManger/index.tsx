import React, { useContext, useEffect } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Grid } from '@mui/material'
import PageHeader from '../../common/components/PageHeader'
import { EPageTitles } from '../../common/enums/global';
import { StudentContext } from './context/Store';
import StudentsList from './components/StudentsList'
import { AddStudentWizardStore } from './components/AddStudentWizard/components/context/Store';
import AddStudentWizard from './components/AddStudentWizard';
import studentServices from '../../services/studentServices';
import { StudentActionTypes } from './context/Actions';
import { EStudentDetailTabs } from '../../common/enums/student';

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

    const getUpdatedStudentList = () => {
        studentServices.getPaginatedStudentList(studentListPagination, appliedStudentListFilters).then(paginatedStudentList => {
            const { pagination, documents } = paginatedStudentList;
            dispatch({
                type: StudentActionTypes.STUDENT_LIST_GET_UPDATED,
                payload: {
                    studentListPagination: pagination,
                    studentsList: documents,
                    refreshStudentList: false,
                }
            });
        });
    }

    useEffect(() => {
        getUpdatedStudentList();
    }, [])

    useEffect(() => {
        getUpdatedStudentList();
    }, [
        appliedStudentListFilters.search,
        appliedStudentListFilters.course,
        appliedStudentListFilters.admission,
        appliedStudentListFilters.graduation,
        appliedStudentListFilters.presence,
        studentListPagination.page,
        refreshStudentList === true
    ])


    const handleSelectStudentId = (thisStudentId: string) => {        
        const thisStudent = studentsList?.find(stud => stud._id === thisStudentId);
        dispatch({
            type: StudentActionTypes.STUDENTS_LIST_SELECT_STUDENT,
            payload: {
                selectedStudentId: thisStudentId,
                selectedStudentInfo: thisStudent,
                activeTabName: EStudentDetailTabs.PROFILE
            }
        });
    }


    return (
        <AddStudentWizardStore>
            <Grid container direction="row">
                <Grid item xs={12} lg={8} sx={{ backgroundColor: "#F5F8FB", padding: 2, minHeight: window.innerHeight }}>
                    <PageHeader breadCrumbs={breadCrumbs} handleBreadCrumbsClick={() => { }} pageTitle={EPageTitles.STUDENTS} >
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
            </Grid>
        </AddStudentWizardStore>
    )
}

export default StudentManager