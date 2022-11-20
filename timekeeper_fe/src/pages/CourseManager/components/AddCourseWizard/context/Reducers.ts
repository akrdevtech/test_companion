import { IAddCourseWizardState } from "../../../../../common/interface/course";
import { IAddCourseWizardActions, IAddCourseWizardActionsPayload, IAddCourseWizardActionTypes } from "./Actions";
import { InitialAddCourseWizardState } from "./Store";

export const CourseReducer = (state: IAddCourseWizardState, action: IAddCourseWizardActions): IAddCourseWizardState => {
    switch (action.type) {
        case IAddCourseWizardActionTypes.ADD_COURSE_WIZARD_TAB_CHANGE:
            return {
                ...state,
                activeTab: action.payload.activeTab,
                verticalStepperSteps: action.payload.verticalStepperSteps,
            }
        case IAddCourseWizardActionTypes.ADD_COURSE_WIZARD_BASIC_INFO_CHANGE:
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
            case IAddCourseWizardActionTypes.ADD_COURSE_WIZARD_RESET_FORM:
            return {
                ...state,
                forms: {...InitialAddCourseWizardState.forms}
            }
        default:
            return state;
    }
}
