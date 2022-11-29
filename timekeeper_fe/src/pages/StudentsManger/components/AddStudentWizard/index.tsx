import React, { useContext } from 'react'
import { Dialog, Grid, IconButton, } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
// import WizardStudentContactInfo from './components/WizardStudentContactInfo';
// import WizardStudentBasicInfo from './components/WizardStudentBasicInfo';
// import WizardStudentCourseInfo from './components/WizardStudentCourseInfo';
// import WizardStudentGaurdianInfo from './components/WizardStudentGaurdianInfo';
// import AddStudentWizardData from "./components/data";
// import AddStudentWizardSchemas from "./components/schema";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import VerticalLinearStepper from '../../../../common/components/VerticalLinearStepper';
import { AddStudentWizardContext, initialAddStudentWizardState } from './components/context/Store';
import { AddStudentWizardActionTypes } from './components/context/Actions';
import { EAddStudentWizardTabs } from '../../../../common/enums/student';
import StudentWizardBasicInfo from './components/StudentWizardBasicInfo';
import StudentWizardContactInfo from './components/StudentWizardContactInfo';
import StudentWizardCourseInfo from './components/StudentWizardCourseInfo';
import StudentWizardGaurdianInfo from './components/StudentWizardGaurdianInfo';

export interface IStudentWizardActiveTabCommonProps {
    handleActiveTabChange?: (p: string) => void;
}

const AddStudentWizard = () => {
    // const { open, handleClose, handleCreateNewStudent } = props;
    const { state, dispatch } = useContext(AddStudentWizardContext);
    const { verticalStepperSteps, activeTab, isWizardOpen } = state;

    // const {
    //     stepperSteps: defaultSteps,
    //     tabIds: defaultTabIds,
    //     stepStatus: defaultStatus,
    //     basicInfoDefaultData,
    //     contactInfoDefaultData,
    //     courseInfoDefaultData,
    //     gaurdianInfoDefaultData,
    //     defaultErrorObject
    // } = AddStudentWizardData;

    // const {
    //     basicInfoSchema,
    //     contactInfoSchema,
    //     courseInfoSchema,
    //     gaurdianInfoSchema
    // } = AddStudentWizardSchemas;

    // const [hasVerified, setHasVerified] = useState(false);
    // const [basicInfo, setBasicInfo] = useState(basicInfoDefaultData);
    // const [contactInfo, setContactInfo] = useState(contactInfoDefaultData);
    // const [courseInfo, setCourseInfo] = useState(courseInfoDefaultData);
    // const [gaurdianInfo, setGaurdianInfo] = useState(gaurdianInfoDefaultData);

    // const [steps, setSteps] = useState(defaultSteps)
    // const [validationErrorsObject, setValidationErrors] = useState(defaultErrorObject)
    // const [activeTab, setActiveTab] = React.useState(defaultTabIds.BASIC_INFO);

    // const validateThisTab = (thisTabId) => {
    //     switch (thisTabId) {
    //         case defaultTabIds.BASIC_INFO: return basicInfoSchema.validate(basicInfo, { abortEarly: false });
    //         case defaultTabIds.CONTACT_INFO: return contactInfoSchema.validate(contactInfo, { abortEarly: false });
    //         case defaultTabIds.COURSE_INFO: return courseInfoSchema.validate(courseInfo, { abortEarly: false });
    //         case defaultTabIds.GAURDIAN_INFO: return gaurdianInfoSchema.validate(gaurdianInfo, { abortEarly: false });
    //         default: return;
    //     }
    // }

    // const handleValidateAll = () => {
    //     const currentValidationErrors = { ...validationErrorsObject };
    //     let allPass = true;
    //     const newSteps = steps.map(step => {
    //         const thisValidationResult = validateThisTab(step.tabId);
    //         const thisStep = { ...step }
    //         if (thisValidationResult.error) {
    //             allPass = false;
    //             thisStep.status = defaultStatus.ERROR;
    //             currentValidationErrors[step.tabId] = thisValidationResult.error.details;
    //         }
    //         else {
    //             thisStep.status = defaultStatus.SUCCESS;
    //             currentValidationErrors[step.tabId] = []
    //         }
    //         return thisStep;
    //     })
    //     setHasVerified(allPass);
    //     setValidationErrors(currentValidationErrors);
    //     setSteps(newSteps);
    // }

    const handleActiveTabChange = (tabId: string): void => {
        //     const currentValidationErrors = { ...validationErrorsObject };
        if (activeTab !== tabId) {
            // const validationResult = validateThisTab(activeTab);
            // setActiveTab(tabId);
            const newSteps = verticalStepperSteps.map(step => {
                const thisStep = { ...step }
                if (activeTab === step.tabId) {
                    // if (validationResult.error) {
                    //     thisStep.status = defaultStatus.ERROR;
                    //     currentValidationErrors[step.tabId] = validationResult.error.details;
                    // }
                    // else {
                    //     thisStep.status = defaultStatus.SUCCESS;
                    //     currentValidationErrors[step.tabId] = []
                    // }
                }
                return thisStep;
            });
            // setValidationErrors(currentValidationErrors);
            // setSteps(newSteps);


            dispatch({
                type: AddStudentWizardActionTypes.TAB_CHANGE,
                payload: {
                    activeTab: tabId as EAddStudentWizardTabs,
                    verticalStepperSteps: newSteps,
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

    // const createStudent = () => {
    //     handleCreateNewStudent({ basicInfo, contactInfo, courseInfo, gaurdianInfo })
    // }

    const getActiveTabComponent = (commonProps: IStudentWizardActiveTabCommonProps) => {
        switch (activeTab) {
            case EAddStudentWizardTabs.BASIC_INFO:
                return <StudentWizardBasicInfo {...commonProps} />;
            case EAddStudentWizardTabs.CONTACT_INFO:
                return <StudentWizardContactInfo {...commonProps} />;
            case EAddStudentWizardTabs.COURSE_INFO:
                return <StudentWizardCourseInfo {...commonProps} />;
            case EAddStudentWizardTabs.GAURDIAN_INFO:
                return <StudentWizardGaurdianInfo {...commonProps} />;
            default: return;
        }
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
                        {getActiveTabComponent({ handleActiveTabChange })}
                    </Grid>
                </Grid>
            </Grid>

        </Dialog >
    )
}

AddStudentWizard.propTypes = {}

export default AddStudentWizard