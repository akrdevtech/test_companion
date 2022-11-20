import { IStepperStep } from "../../../../../common/components/VerticalLinearStepper/components/StepperStep";
import { EAddCourseWizardTabs } from "../../../../../common/enums/course";
import { IAddCourseWizardBasicInfo } from "../../../../../common/interface/course";
import { ActionMap } from "../../../../../common/types/global";

export type IAddCourseWizardActions = ActionMap<IAddCourseWizardActionsPayload>[keyof ActionMap<IAddCourseWizardActionsPayload>];
export enum IAddCourseWizardActionTypes {
    ADD_COURSE_WIZARD_TAB_CHANGE = 'ADD_COURSE_WIZARD_TAB_CHANGE',
    ADD_COURSE_WIZARD_BASIC_INFO_CHANGE = 'ADD_COURSE_WIZARD_BASIC_INFO_CHANGE',
    ADD_COURSE_WIZARD_RESET_FORM = 'ADD_COURSE_WIZARD_RESET_FORM',

}
export type IAddCourseWizardActionsPayload = {
    [IAddCourseWizardActionTypes.ADD_COURSE_WIZARD_TAB_CHANGE]: {
        activeTab: EAddCourseWizardTabs,
        verticalStepperSteps: IStepperStep[],
    },
    [IAddCourseWizardActionTypes.ADD_COURSE_WIZARD_BASIC_INFO_CHANGE]: {
        basicInfo: IAddCourseWizardBasicInfo,
        hasErrors: boolean,
    },
    [IAddCourseWizardActionTypes.ADD_COURSE_WIZARD_RESET_FORM]:{},
}
