import React, { useContext } from 'react'
// import StudentsListItem from './components/StudentsListItem'
import { Grid } from '@mui/material'
import NoSearchResults from '../../../../common/icons/placeholders/NoSearchResults';
import { useTheme } from '@mui/material/styles';
import { IStudent } from '../../../../common/interface/student';
// import FilterTray from './components/FilterTray';
import Fab from '@mui/material/Fab';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AppliedStudentFilters from '../AppliedStudentFilters';
import { AddStudentWizardContext } from '../AddStudentWizard/components/data/context/Store';
import { AddStudentWizardActionTypes } from '../AddStudentWizard/components/data/context/Actions';

interface IStudentListProps {
    studentsList?: IStudent[];
    selectedStudentId?: string;
    handleSelectStudentId: (thisStudentId: string) => void;
}
const StudentsList = (props: IStudentListProps) => {
    const theme = useTheme()
    const { studentsList, selectedStudentId, handleSelectStudentId } = props;
    const { state, dispatch } = useContext(AddStudentWizardContext);

    const handleAddStudentWizardOpen = () => {
        dispatch({
            type: AddStudentWizardActionTypes.WIZARD_OPEN,
            payload: {},
        })
    }

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" >
            {/* <Grid item xs={12} lg={12} sx={{ paddingBottom: 2 }}> */}
            {/* <FilterTray /> */}
            {/* </Grid> */}
            <Grid item xs={12} lg={12} sx={{ paddingBottom: 2, marginTop: 2 }}>
                <AppliedStudentFilters />
            </Grid>
            <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                    {
                        studentsList?.length ? (studentsList.map(studentInfo => (
                            <Grid item xs={11} lg={6} key={studentInfo?._id} >
                                {/* <StudentsListItem
                                    studentInfo={studentInfo}
                                    selectedStudentId={selectedStudentId}
                                    handleSelectStudentId={handleSelectStudentId}
                                /> */}
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
                sx={{ position: "absolute", bottom: theme.spacing(2), right: "33%", textAlign: 'right' }}
                onClick={() => handleAddStudentWizardOpen()}
            >
                <PersonAddAltIcon />
            </Fab>
        </Grid>
    )
}

export default StudentsList