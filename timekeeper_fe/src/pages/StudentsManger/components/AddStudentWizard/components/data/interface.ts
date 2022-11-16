import { IStepperStep } from "../../../../../../common/components/VerticalLinearStepper/components/StepperStep";
import { EAddStudentWizardTabs } from "./enums";

export interface IStudentWizardBasicInfo {
    name: string;
    gender: string;
    dateOfBirth: Date;
    occupation?: string;
}
export interface IStudentWizardContactInfo {
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    pin: number | string;
}
export interface IStudentWizardCourseInfo {
    course: string;
    dateOfAdmission: Date;
    admissionNumber: string;
}
export interface IStudentWizardGaurdianInfo {
    nameOfGaurdian: string;
    phoneOfGaurdian: string;
}
export interface IAddStudentWizardState {
    activeTab: EAddStudentWizardTabs;
    basicInfo: IStudentWizardBasicInfo;
    contactInfo: IStudentWizardContactInfo;
    courseInfo: IStudentWizardCourseInfo;
    gaurdianInfo: IStudentWizardGaurdianInfo;
    verticalStepperSteps: IStepperStep[];
    wizard: {
        open: boolean;
    }
}