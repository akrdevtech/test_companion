import { IStepperStep } from "../components/VerticalLinearStepper/components/StepperStep";
import { EAddStudentWizardBasicInfoFields, EAddStudentWizardContactInfoFields, EAddStudentWizardCourseInfoFields, EAddStudentWizardGaurdianInfoFields, EAddStudentWizardTabs, EStudentAdmissionFilter, EStudentDetailTabs, EStudentGraduationFilter, EStudentPresenceFilter } from "../enums/student";
import { IListPagination, IWizardFormFields } from "./global";

export interface IStudent {
    _id: string;
    firstName: string;
}

export interface IAttendance {
    clockedIn: Date;
    clockedOut?: Date;
}

export interface IStudentListFilters {
    admission: EStudentAdmissionFilter;
    graduation: EStudentGraduationFilter;
    presence: EStudentPresenceFilter;
    course: string;
    search?: string;
}

export interface IStudentState {
    studentsList?: IStudent[];
    refreshStudentList: boolean;
    selectedStudentId?: string | undefined;
    selectedStudentInfo?: IStudent | undefined;
    selectedStudentAttendance: {
        selectedYear: number;
        selectedMonth: number;
        selectedMonthAttendance?: IAttendance[],
        selectedDate?: Date | null;
        clockedIn?: Date | null;
        clockedOut?: Date | null;
        totalAttendance: number;
        thisMonthAttendance: number;
        refreshAttendanceCalendar: boolean;
    },
    isAddStudentWizardOpen: boolean;
    studentListPagination: IListPagination;
    appliedStudentListFilters: IStudentListFilters;
    filterTrayToggle: boolean;
    studentDetailsActiveTab: EStudentDetailTabs
}

export interface IStudentWizardBasicInfo {
    [EAddStudentWizardBasicInfoFields.STUDENT_NAME]: IWizardFormFields<string>;
    [EAddStudentWizardBasicInfoFields.STUDENT_GENDER]: IWizardFormFields<string>;
    [EAddStudentWizardBasicInfoFields.STUDENT_DOB]: IWizardFormFields<Date>;
    [EAddStudentWizardBasicInfoFields.STUDENT_OCCUPATION]: IWizardFormFields<string>;
    hasErrors: boolean;
}
export interface IStudentWizardContactInfo {
    [EAddStudentWizardContactInfoFields.STUDENT_EMAIL]: IWizardFormFields<string>;
    [EAddStudentWizardContactInfoFields.STUDENT_PHONE]: IWizardFormFields<string>;
    [EAddStudentWizardContactInfoFields.STUDENT_ADDRESS_LINE_1]: IWizardFormFields<string>;
    [EAddStudentWizardContactInfoFields.STUDENT_ADDRESS_LINE_2]?: IWizardFormFields<string>;
    [EAddStudentWizardContactInfoFields.STUDENT_PIN]: IWizardFormFields<number | string>;
    hasErrors: boolean;
}
export interface IStudentWizardCourseInfo {
    [EAddStudentWizardCourseInfoFields.STUDENT_COURSE]: IWizardFormFields<string>;
    [EAddStudentWizardCourseInfoFields.STUDENT_DATE_OF_ADMISSION]: IWizardFormFields<Date>;
    [EAddStudentWizardCourseInfoFields.STUDENT_ADMISSION_NUMBER]: IWizardFormFields<string>;
    hasErrors: boolean;
}
export interface IStudentWizardGaurdianInfo {
    [EAddStudentWizardGaurdianInfoFields.STUDENT_GAURDIAN_NAME]: IWizardFormFields<string>;
    [EAddStudentWizardGaurdianInfoFields.STUDENT_GAURDIAN_PHONE]: IWizardFormFields<string>;
    hasErrors: boolean;
}
export interface IAddStudentWizardState {
    forms: {
        basicInfo: IStudentWizardBasicInfo;
        contactInfo: IStudentWizardContactInfo;
        courseInfo: IStudentWizardCourseInfo;
        gaurdianInfo: IStudentWizardGaurdianInfo;
    };
    activeTab: EAddStudentWizardTabs;
    verticalStepperSteps: IStepperStep[];
    isWizardOpen: boolean;
    hasErrors: boolean;
}
