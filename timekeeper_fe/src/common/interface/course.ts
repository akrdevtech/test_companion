import { IStepperStep } from "../components/VerticalLinearStepper/components/StepperStep";
import { EAddCourseWizardBasicInfoFields, EAddCourseWizardTabs, ECourseDetailTabs, ECourseStatus } from "../enums/course";
import { IListPagination, IWizardFormFields } from "./global";
import { IStudent } from "./student";

export interface ICourse {
    _id?: string;
    courseId: string;
    courseName: string;
    duration: number;
    fee: number;
    totalCredits: number;
    minCredits: number;
    status: ECourseStatus;
    studentsAttending: number;
    studentsGraduated: number;
}

export interface ICourseListFilters {
    status?: ECourseStatus | null | undefined | 'any';
    search?: string;
}
export interface IAddCourseWizardBasicInfo {
    [EAddCourseWizardBasicInfoFields.COURSE_ID]: IWizardFormFields<string>;
    [EAddCourseWizardBasicInfoFields.COURSE_NAME]: IWizardFormFields<string>;
    [EAddCourseWizardBasicInfoFields.DURATION]: IWizardFormFields<number>;
    [EAddCourseWizardBasicInfoFields.FEE]: IWizardFormFields<number>;
    [EAddCourseWizardBasicInfoFields.TOTAL_CREDITS]: IWizardFormFields<number>;
    [EAddCourseWizardBasicInfoFields.MIN_CREDITS]: IWizardFormFields<number>;
    hasErrors: boolean;
}
export interface IAddCourseWizardState {
    activeTab: EAddCourseWizardTabs;
    verticalStepperSteps: IStepperStep[];
    isWizardOpen: boolean;
    forms: {
        basicInfo: IAddCourseWizardBasicInfo;
    }
    hasErrors: boolean;
}
export interface ICourseState {
    coursesList: ICourse[];
    refreshCourseList: boolean;
    selectedCourseId: string | null | undefined;
    selectedCourseInfo: ICourse | null | undefined;
    courseListPagination: IListPagination;
    courseDetailsActiveTab: ECourseDetailTabs;
    courseDetailsStudents: {
        studentList: IStudent[];
        pagination: IListPagination;
        refreshStudentList: boolean;
        selectedStudentInCourseInfo: IStudent | null | undefined;
    }
    appliedCourseListFilters: ICourseListFilters;
    isAddCourseWizardOpen: boolean;
}