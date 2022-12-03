import { EStepperStepStatus, IStepperStep } from "../../../../../../common/components/VerticalLinearStepper/components/StepperStep";
import { EAddStudentWizardTabs } from "../../../../../../common/enums/student";
import { IAddStudentWizardState } from "../../../../../../common/interface/student";
import { AddStudentWizardActions, AddStudentWizardActionsPayload, AddStudentWizardActionTypes } from "./Actions";

const getVerticalStepperStepStatus = (existingSteps: IStepperStep[], activeTabId: EAddStudentWizardTabs, hasErrors: boolean): IStepperStep[] => {
    return existingSteps.map(step => {
        if (step.tabId !== activeTabId) { return step; }
        return { ...step, status: hasErrors ? EStepperStepStatus.ERROR : EStepperStepStatus.SUCCESS }
    })
}

export const AddStudentWizardReducer = (state: IAddStudentWizardState, action: AddStudentWizardActions): IAddStudentWizardState => {
    switch (action.type) {
        case AddStudentWizardActionTypes.WIZARD_OPEN:
            return {
                ...state,
                isWizardOpen: true,
            }
        case AddStudentWizardActionTypes.WIZARD_CLOSE:
            return {
                ...state,
                isWizardOpen: false,
            }
        case AddStudentWizardActionTypes.WIZARD_RESET:
            return {
                ...action.payload.initialState,
                isWizardOpen: true,
            }
        case AddStudentWizardActionTypes.TAB_CHANGE: {
            return {
                ...state,
                activeTab: action.payload.activeTab,
                verticalStepperSteps: action.payload.verticalStepperSteps,
                forms: action.payload.forms,
            }
        }
        case AddStudentWizardActionTypes.BASIC_INFO_CHANGE:
            return {
                ...state,
                forms: {
                    ...state.forms,
                    basicInfo: {
                        ...state.forms.basicInfo,
                        ...action.payload.basicInfo,
                    }
                },
                hasErrors: true,
                verticalStepperSteps: getVerticalStepperStepStatus(
                    state.verticalStepperSteps,
                    EAddStudentWizardTabs.BASIC_INFO,
                    action.payload.hasErrors
                ),
            }
        case AddStudentWizardActionTypes.CONTACT_INFO_CHANGE:
            return {
                ...state,
                forms: {
                    ...state.forms,
                    contactInfo: {
                        ...state.forms.contactInfo,
                        ...action.payload.contactInfo,
                    }
                },
                hasErrors: true,
                verticalStepperSteps: getVerticalStepperStepStatus(
                    state.verticalStepperSteps,
                    EAddStudentWizardTabs.CONTACT_INFO,
                    action.payload.hasErrors
                ),
            }
        case AddStudentWizardActionTypes.COURSE_INFO_CHANGE:
            return {
                ...state,
                forms: {
                    ...state.forms,
                    courseInfo: {
                        ...state.forms.courseInfo,
                        ...action.payload.courseInfo,
                    }
                },
                hasErrors: true,
                verticalStepperSteps: getVerticalStepperStepStatus(
                    state.verticalStepperSteps,
                    EAddStudentWizardTabs.COURSE_INFO,
                    action.payload.hasErrors
                ),
            }
        case AddStudentWizardActionTypes.GAURDIAN_INFO_CHANGE:
            return {
                ...state,
                forms: {
                    ...state.forms,
                    gaurdianInfo: {
                        ...state.forms.gaurdianInfo,
                        ...action.payload.gaurdianInfo,
                    }
                },
                hasErrors: true,
                verticalStepperSteps: getVerticalStepperStepStatus(
                    state.verticalStepperSteps,
                    EAddStudentWizardTabs.GAURDIAN_INFO,
                    action.payload.hasErrors
                ),
            }
        case AddStudentWizardActionTypes.WIZARD_VALIDATE_ALL:
            return {
                ...state,
                forms: action.payload.forms,
                hasErrors: action.payload.hasErrors,
                verticalStepperSteps: action.payload.verticalStepperSteps,
            }
        default:
            return state;
    }
}
