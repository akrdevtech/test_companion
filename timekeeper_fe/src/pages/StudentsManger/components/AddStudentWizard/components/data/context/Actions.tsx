import { IStepperStep } from "../../../../../../../common/components/VerticalLinearStepper/components/StepperStep";
import { ActionMap } from "../../../../../../../common/types/global";
import { EAddStudentWizardTabs } from "../enums";

export type AddStudentWizardActions = ActionMap<AddStudentWizardActionsPayload>[keyof ActionMap<AddStudentWizardActionsPayload>];
export enum AddStudentWizardActionTypes {
    TAB_CHANGE = 'ADD-STUDENT-WIZARD-TAB-CHNAGE',
    WIZARD_OPEN = 'ADD-STUDENT-WIZARD-OPEN',
    WIZARD_CLOSE = 'ADD-STUDENT-WIZARD-CLOSE',
}
export type AddStudentWizardActionsPayload = {
    [AddStudentWizardActionTypes.WIZARD_OPEN]: {};
    [AddStudentWizardActionTypes.WIZARD_CLOSE]: {};
    [AddStudentWizardActionTypes.TAB_CHANGE]: {
        activeTab: EAddStudentWizardTabs,
        verticalStepperSteps: IStepperStep[]
    };
}
