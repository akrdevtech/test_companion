import { IStepperStep } from "../../../../../../common/components/VerticalLinearStepper/components/StepperStep";
import { EAddStudentWizardTabs } from "../../../../../../common/enums/student";
import { IAddStudentWizardState, IStudentWizardBasicInfo, IStudentWizardContactInfo, IStudentWizardCourseInfo, IStudentWizardGaurdianInfo } from "../../../../../../common/interface/student";
import { ActionMap } from "../../../../../../common/types/global";

export type AddStudentWizardActions = ActionMap<AddStudentWizardActionsPayload>[keyof ActionMap<AddStudentWizardActionsPayload>];
export enum AddStudentWizardActionTypes {
    TAB_CHANGE = 'ADD_STUDENT_WIZARD_TAB_CHNAGE',
    WIZARD_OPEN = 'ADD_STUDENT_WIZARD_OPEN',
    WIZARD_CLOSE = 'ADD_STUDENT_WIZARD_CLOSE',
    WIZARD_RESET = 'ADD_STUDENT_WIZARD_RESET',
    WIZARD_VALIDATE_ALL = 'ADD_STUDENT_WIZARD_VALIDATE_ALL',
    BASIC_INFO_CHANGE = 'ADD_STUDENT_WIZARD_BASIC_INFO_CHANGE',
    CONTACT_INFO_CHANGE = 'ADD_STUDENT_WIZARD_CONTACT_INFO_CHANGE',
    COURSE_INFO_CHANGE = 'ADD_STUDENT_WIZARD_COURSE_INFO_CHANGE',
    GAURDIAN_INFO_CHANGE = 'ADD_STUDENT_WIZARD_GAURDIAN_INFO_CHANGE',
}
export type AddStudentWizardActionsPayload = {
    [AddStudentWizardActionTypes.WIZARD_OPEN]: {};
    [AddStudentWizardActionTypes.WIZARD_CLOSE]: {};
    [AddStudentWizardActionTypes.WIZARD_RESET]: {
        initialState: IAddStudentWizardState;
    };
    [AddStudentWizardActionTypes.WIZARD_VALIDATE_ALL]: {
        forms: IAddStudentWizardState["forms"];
        hasErrors: boolean;
        verticalStepperSteps: IStepperStep[];
    };
    [AddStudentWizardActionTypes.TAB_CHANGE]: {
        activeTab: EAddStudentWizardTabs;
        verticalStepperSteps: IStepperStep[];
        forms: IAddStudentWizardState["forms"]
    };
    [AddStudentWizardActionTypes.BASIC_INFO_CHANGE]: {
        basicInfo: IStudentWizardBasicInfo;
        hasErrors: boolean;
    };
    [AddStudentWizardActionTypes.CONTACT_INFO_CHANGE]: {
        contactInfo: IStudentWizardContactInfo;
        hasErrors: boolean;
    };
    [AddStudentWizardActionTypes.COURSE_INFO_CHANGE]: {
        courseInfo: IStudentWizardCourseInfo;
        hasErrors: boolean;
    };
    [AddStudentWizardActionTypes.GAURDIAN_INFO_CHANGE]: {
        gaurdianInfo: IStudentWizardGaurdianInfo;
        hasErrors: boolean;
    };
}
