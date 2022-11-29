import React, { useContext, useState } from 'react'
import { Dialog, Grid, IconButton, } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import CourseWizardBasicInfo from './components/CourseWizardBasicInfo';
import AddCourseWizardSchemas from "./components/schema";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import VerticalLinearStepper from '../../../../common/components/VerticalLinearStepper';
import { CourseContext } from '../../context/Store';
import { CourseActionTypes } from '../../context/Actions';
import { EAddCourseWizardTabs } from '../../../../common/enums/course';
import { AddCourseWizardContext } from './context/Store';
import { IAddCourseWizardActionTypes } from './context/Actions';

const AddCourseWizard = () => {
    const { state: courseState, dispatch: courseDispatch } = useContext(CourseContext)
    const { state, dispatch } = useContext(AddCourseWizardContext)
    const {
        isAddCourseWizardOpen,
    } = courseState;

    const { activeTab, verticalStepperSteps } = state;

    const handleClose = (activity: boolean = false): void => {
        console.log(`closing:${activity}`);
        courseDispatch({
            type: CourseActionTypes.ADD_COURSE_WIZARD_CLOSE,
            payload: { refreshCourseList: activity }
        })
    }

    const handleActiveTabChange = (tabId: string): void => {
        if (activeTab !== tabId) {
            const newSteps = verticalStepperSteps.map(step => {
                const thisStep = { ...step }
                if (activeTab === step.tabId) {

                }
                return thisStep;
            });

            dispatch({
                type: IAddCourseWizardActionTypes.ADD_COURSE_WIZARD_TAB_CHANGE,
                payload: {
                    activeTab: tabId as EAddCourseWizardTabs,
                    verticalStepperSteps: newSteps,
                }
            })
        }
    }

    const getActiveTabComponent = () => {
        switch (activeTab) {
            case EAddCourseWizardTabs.BASIC_INFO:
                return <CourseWizardBasicInfo
                    handleActiveTabChange={handleActiveTabChange}
                    handleCloseWizard={handleClose}
                />;
            default: return;
        }
    }

    const handleResetData = () => {
        dispatch({
            type: IAddCourseWizardActionTypes.ADD_COURSE_WIZARD_RESET_FORM,
            payload: {}
        })
    }
    return (
        <Dialog open={isAddCourseWizardOpen} onClose={() => handleClose()} fullWidth maxWidth="lg" >
            <Grid container direction="row" justifyContent="center" alignItems='center' sx={{ minHeight: 600, maxHeight: 600 }}>
                <Grid item lg={4} sx={{ backgroundColor: "#fff" }}>
                    <VerticalLinearStepper
                        steps={verticalStepperSteps}
                        activeTab={activeTab}
                        handleActiveTabChange={handleActiveTabChange}
                        title="ADD COURSE" />
                </Grid>
                <Grid item lg={8} sx={{ backgroundColor: "#F5F8FB", minHeight: 600 }}>
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs={12}>
                            <IconButton
                                sx={{ float: "right" }}
                                color="error"
                                size='small'
                                onClick={() => handleClose()}
                            >
                                <CloseIcon />
                            </IconButton>
                            <IconButton
                                sx={{ float: "right" }}
                                size='small'
                                onClick={() => handleResetData()}
                            >
                                <RestartAltIcon />
                            </IconButton>
                        </Grid>
                        {getActiveTabComponent()}
                    </Grid>
                </Grid>
            </Grid>

        </Dialog >
    )
}
export default AddCourseWizard