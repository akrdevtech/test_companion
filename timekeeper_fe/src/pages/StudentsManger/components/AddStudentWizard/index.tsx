import React, { useContext } from 'react'
import { Dialog, Grid, IconButton, } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import VerticalLinearStepper from '../../../../common/components/VerticalLinearStepper';
import { AddStudentWizardContext, initialAddStudentWizardState } from './components/context/Store';
import { AddStudentWizardActionTypes } from './components/context/Actions';
import {
    EAddStudentWizardBasicInfoFields,
    EAddStudentWizardContactInfoFields,
    EAddStudentWizardTabs,
    EAddStudentWizardCourseInfoFields,
    EAddStudentWizardGaurdianInfoFields
} from '../../../../common/enums/student';
import StudentWizardBasicInfo from './components/StudentWizardBasicInfo';
import StudentWizardContactInfo from './components/StudentWizardContactInfo';
import StudentWizardCourseInfo from './components/StudentWizardCourseInfo';
import StudentWizardGaurdianInfo from './components/StudentWizardGaurdianInfo';
import AddStudentWizardSchemas from './components/schemas';
import { IAddStudentWizardState } from '../../../../common/interface/student';
import { EStepperStepStatus } from '../../../../common/components/VerticalLinearStepper/components/StepperStep';
import { GlobalContext } from '../../../../common/context/Store';
import { GlobalActionTypes } from '../../../../common/context/Actions';
import studentServices from '../../../../services/studentServices';
import { EAlertSeverity } from '../../../../common/enums/global';

export interface IStudentWizardActiveTabCommonProps {
    handleActiveTabChange: (p: EAddStudentWizardTabs | string) => void;
    validateAll: () => void;
    createStudent: () => void;
}

const validateThisTab = (thisTabId: EAddStudentWizardTabs, wizardState: IAddStudentWizardState): Partial<IAddStudentWizardState> => {
    const {
        studentWizardFieldSchemas: {
            basicInfoSchema,
            contactInfoSchema,
            courseInfoSchema,
            gaurdianInfoSchema
        }
    } = AddStudentWizardSchemas;
    const {
        forms: {
            basicInfo,
            contactInfo,
            courseInfo,
            gaurdianInfo
        }
    } = wizardState;

    switch (thisTabId) {
        case EAddStudentWizardTabs.BASIC_INFO: {

            const newBasicInfo = JSON.parse(JSON.stringify(basicInfo));
            newBasicInfo.hasErrors = false;
            Object.keys(newBasicInfo).filter(key => key !== 'hasErrors').map(key => {
                const field = key as EAddStudentWizardBasicInfoFields;
                const fieldError = basicInfoSchema[field]
                    .validate(
                        newBasicInfo[field].value,
                        { abortEarly: false }
                    ).error;
                newBasicInfo.hasErrors = fieldError ? true : newBasicInfo.hasErrors;
                return newBasicInfo[field].error = fieldError ? `${fieldError}` : null
            })
            return newBasicInfo as typeof basicInfo;
        }
        case EAddStudentWizardTabs.CONTACT_INFO: {
            const newContactInfo = JSON.parse(JSON.stringify(contactInfo));
            newContactInfo.hasErrors = false;
            Object.keys(newContactInfo)
                .filter(key => key !== 'hasErrors')
                .map(key => {
                    const field = key as EAddStudentWizardContactInfoFields
                    const fieldError = contactInfoSchema[field]
                        .validate(newContactInfo[field]?.value, { abortEarly: false }).error;
                    newContactInfo.hasErrors = fieldError ? true : newContactInfo.hasErrors;
                    return newContactInfo[field].error = fieldError ? `${fieldError}` : null
                })
            return newContactInfo as typeof newContactInfo;
        }
        case EAddStudentWizardTabs.COURSE_INFO: {
            const newCourseInfo = JSON.parse(JSON.stringify(courseInfo));
            newCourseInfo.hasErrors = false;
            Object.keys(newCourseInfo)
                .filter(key => key !== 'hasErrors')
                .map(key => {
                    const field = key as EAddStudentWizardCourseInfoFields
                    const fieldError = courseInfoSchema[field]
                        .validate(newCourseInfo[field]?.value, { abortEarly: false }).error;
                    newCourseInfo.hasErrors = fieldError ? true : newCourseInfo.hasErrors;
                    return newCourseInfo[field].error = fieldError ? `${fieldError}` : null
                })
            return newCourseInfo as typeof newCourseInfo;
        }
        case EAddStudentWizardTabs.GAURDIAN_INFO: {
            const newGaurdianInfo = JSON.parse(JSON.stringify(gaurdianInfo));
            newGaurdianInfo.hasErrors = false;
            Object.keys(newGaurdianInfo)
                .filter(key => key !== 'hasErrors')
                .map(key => {
                    const field = key as EAddStudentWizardGaurdianInfoFields
                    const fieldError = gaurdianInfoSchema[field]
                        .validate(newGaurdianInfo[field]?.value, { abortEarly: false }).error;
                    newGaurdianInfo.hasErrors = fieldError ? true : newGaurdianInfo.hasErrors;
                    return newGaurdianInfo[field].error = fieldError ? `${fieldError}` : null
                })
            return newGaurdianInfo as typeof newGaurdianInfo;
        }
        default: {
            return wizardState;
        }
    }
}

const getActiveTabComponent = (activeTab: EAddStudentWizardTabs, commonProps: IStudentWizardActiveTabCommonProps) => {
    switch (activeTab) {
        case EAddStudentWizardTabs.BASIC_INFO:
            return <StudentWizardBasicInfo {...commonProps} />;
        case EAddStudentWizardTabs.CONTACT_INFO:
            return <StudentWizardContactInfo {...commonProps} />;
        case EAddStudentWizardTabs.COURSE_INFO:
            return <StudentWizardCourseInfo {...commonProps} />;
        case EAddStudentWizardTabs.GAURDIAN_INFO:
            return <StudentWizardGaurdianInfo {...{ ...commonProps }} />;
        default: return;
    }
}

const getNewForms = (
    forms: IAddStudentWizardState["forms"],
    validationResult: Partial<IAddStudentWizardState>,
    thisTab: EAddStudentWizardTabs) => {
    const newForms = { ...forms }
    switch (thisTab) {
        case EAddStudentWizardTabs.BASIC_INFO: newForms.basicInfo = validationResult as typeof newForms.basicInfo; break;
        case EAddStudentWizardTabs.COURSE_INFO: newForms.courseInfo = validationResult as typeof newForms.courseInfo; break;
        case EAddStudentWizardTabs.CONTACT_INFO: newForms.contactInfo = validationResult as typeof newForms.contactInfo; break;
        case EAddStudentWizardTabs.GAURDIAN_INFO: newForms.gaurdianInfo = validationResult as typeof newForms.gaurdianInfo; break;
        default: break;
    }
    return newForms;
}

const AddStudentWizard = () => {
    const { state, dispatch } = useContext(AddStudentWizardContext);
    const { verticalStepperSteps, activeTab, isWizardOpen, forms } = state;
    const { dispatch: globalDispatch } = useContext(GlobalContext)

    const handleActiveTabChange = (tabId: EAddStudentWizardTabs | string): void => {
        let newForms = { ...forms }
        if (activeTab !== tabId) {
            const newSteps = verticalStepperSteps.map(step => {
                const thisStep = { ...step }
                if (activeTab === step.tabId) {
                    const validationResult = validateThisTab(activeTab as EAddStudentWizardTabs, state);
                    newForms = getNewForms(forms, validationResult, activeTab)
                    thisStep.status = validationResult.hasErrors ? EStepperStepStatus.ERROR : EStepperStepStatus.SUCCESS;
                }
                return thisStep;
            });
            dispatch({
                type: AddStudentWizardActionTypes.TAB_CHANGE,
                payload: {
                    activeTab: tabId as EAddStudentWizardTabs,
                    verticalStepperSteps: newSteps,
                    forms: newForms,
                }
            })
        }
    }

    const handleResetData = () => {
        dispatch({
            type: AddStudentWizardActionTypes.WIZARD_RESET,
            payload: {
                initialState: { ...initialAddStudentWizardState },
            }
        })
    }

    const createStudent = () => {
        studentServices.createStudent(forms).then(() => {
            globalDispatch({
                type: GlobalActionTypes.GENERIC_SNACKBAR_OPEN,
                payload: {
                    message: "Student Created Successfully",
                }
            });
            handleClose();
        }).catch(err => {
            globalDispatch({
                type: GlobalActionTypes.GENERIC_SNACKBAR_OPEN,
                payload: {
                    message: "Student Creation Failed",
                    severity: EAlertSeverity.ERROR,
                }
            })
        })
    }

    const validateAll = () => {
        let newForms = { ...forms }
        let hasErrors = false;
        let newSteps = [...verticalStepperSteps]
        Object.entries(EAddStudentWizardTabs).map(([key, value]) => {
            const validationResult = validateThisTab(value as EAddStudentWizardTabs, state);
            if (validationResult.hasErrors) {
                hasErrors = true;
            }
            newSteps = newSteps.map(step => {
                const thisStep = { ...step }
                if (value === step.tabId) {
                    thisStep.status = validationResult.hasErrors ? EStepperStepStatus.ERROR : EStepperStepStatus.SUCCESS;
                }
                return thisStep;
            });
            newForms = { ...newForms, ...getNewForms(newForms, validationResult, value) }
            return { key, validationResult }
        })
        dispatch({
            type: AddStudentWizardActionTypes.WIZARD_VALIDATE_ALL,
            payload: { forms: newForms, hasErrors, verticalStepperSteps: newSteps }
        })
    }

    const handleClose = () => {
        dispatch({
            type: AddStudentWizardActionTypes.WIZARD_CLOSE,
            payload: {}
        })
    }
    return (
        <Dialog open={isWizardOpen} onClose={() => handleClose()} fullWidth maxWidth="lg" >
            <Grid container direction="row" justifyContent="center" alignItems='center' sx={{ minHeight: 600 }}>
                <Grid item lg={4} sx={{ backgroundColor: "#fff" }}>
                    <VerticalLinearStepper
                        steps={verticalStepperSteps}
                        activeTab={activeTab}
                        handleActiveTabChange={handleActiveTabChange}
                        title="ADD STUDENT"
                    />
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
                        {getActiveTabComponent(activeTab, { handleActiveTabChange, validateAll, createStudent })}
                    </Grid>
                </Grid>
            </Grid>

        </Dialog >
    )
}

export default AddStudentWizard