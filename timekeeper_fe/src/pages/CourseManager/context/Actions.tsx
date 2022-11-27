import { IStepperStep } from "../../../common/components/VerticalLinearStepper/components/StepperStep";
import { EAddCourseWizardTabs } from "../../../common/enums/course";
import { IAddCourseWizardBasicInfo, ICourse, ICourseListFilters } from "../../../common/interface/course";
import { IListPagination } from "../../../common/interface/global";
import { ActionMap } from "../../../common/types/global";

export type CourseActions = ActionMap<CourseActionsPayload>[keyof ActionMap<CourseActionsPayload>];
export enum CourseActionTypes {
    COURSE_DETAILS_TAB_CHANGE = 'COURSE_DETAILS_TAB_CHANGE',
    COURSE_LIST_FILTER_CHANGE = 'COURSE_LIST_FILTER_CHANGE',
    COURSE_LIST_GET_UPDATED = 'COURSE_LIST_GET_UPDATED',
    COURSE_LIST_REFRESH = 'COURSE_LIST_REFRESH',
    COURSE_LIST_SELECT_COURSE = 'COURSE_LIST_SELECT_COURSE',
    COURSE_LIST_PAGINATION_CHANGE = 'COURSE_LIST_PAGINATION_CHANGE',
    ADD_COURSE_WIZARD_OPEN = 'ADD_COURSE_WIZARD_OPEN',
    ADD_COURSE_WIZARD_CLOSE = 'ADD_COURSE_WIZARD_CLOSE',
}
export type CourseActionsPayload = {
    [CourseActionTypes.COURSE_DETAILS_TAB_CHANGE]: {};
    [CourseActionTypes.COURSE_LIST_FILTER_CHANGE]: {
        appliedCourseListFilters: ICourseListFilters,
    };
    [CourseActionTypes.COURSE_LIST_PAGINATION_CHANGE]: {
        courseListPagination: IListPagination
    };
    [CourseActionTypes.COURSE_LIST_GET_UPDATED]: {
        courseListPagination: IListPagination,
        coursesList: ICourse[],
        refreshCourseList: boolean,
    };
    [CourseActionTypes.ADD_COURSE_WIZARD_OPEN]: {};
    [CourseActionTypes.ADD_COURSE_WIZARD_CLOSE]: {
        refreshCourseList?: boolean,
    };
    [CourseActionTypes.COURSE_LIST_SELECT_COURSE]: {
        selectedCourseId: string;
        selectedCourseInfo: ICourse | undefined;
    };
    [CourseActionTypes.COURSE_LIST_REFRESH]: {};
}
