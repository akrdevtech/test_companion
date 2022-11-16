import { IAddStudentWizardState } from "../interface";
import { AddStudentWizardActions, AddStudentWizardActionsPayload, AddStudentWizardActionTypes } from "./Actions";

export const AddStudentWizardReducer = (state: IAddStudentWizardState, action: AddStudentWizardActions): IAddStudentWizardState => {
    switch (action.type) {
        case AddStudentWizardActionTypes.WIZARD_OPEN:
            return {
                ...state,
                wizard: {
                    ...state.wizard,
                    open: true,
                }
            }
        case AddStudentWizardActionTypes.WIZARD_CLOSE:
            return {
                ...state,
                wizard: {
                    ...state.wizard,
                    open: false,
                }
            }
        case AddStudentWizardActionTypes.TAB_CHANGE:{
            console.log(action);
            
            return {
                ...state,
                activeTab: action.payload.activeTab,
                verticalStepperSteps: action.payload.verticalStepperSteps,
            }}
        default:
            return state;
    }
}
