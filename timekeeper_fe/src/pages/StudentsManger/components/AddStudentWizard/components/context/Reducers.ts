import { IAddStudentWizardState } from "../../../../../../common/interface/student";
import { AddStudentWizardActions, AddStudentWizardActionsPayload, AddStudentWizardActionTypes } from "./Actions";

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
                hasErrors: action.payload.hasErrors
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
                hasErrors: action.payload.hasErrors
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
                hasErrors: action.payload.hasErrors
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
                hasErrors: action.payload.hasErrors
            }
        default:
            return state;
    }
}
