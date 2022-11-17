import { ICourseListFilters } from "../../../common/interface/course";
import { IListPagination } from "../../../common/interface/global";
import { ActionMap } from "../../../common/types/global";

export type CourseActions = ActionMap<CourseActionsPayload>[keyof ActionMap<CourseActionsPayload>];
export enum CourseActionTypes {
    COURSE_DETAILS_TAB_CHANGE = 'COURSE_DETAILS_TAB_CHANGE',
    COURSE_LIST_FILTER_CHANGE = 'COURSE_LIST_FILTER_CHANGE',
    STUDENT_LIST_PAGINATION_CHANGE = 'STUDENT_LIST_PAGINATION_CHANGE',
}
export type CourseActionsPayload = {
    [CourseActionTypes.COURSE_DETAILS_TAB_CHANGE]: {};
    [CourseActionTypes.COURSE_LIST_FILTER_CHANGE]: {
        appliedCourseListFilters: ICourseListFilters,
    };
    [CourseActionTypes.STUDENT_LIST_PAGINATION_CHANGE]:{
        courseListPagination: IListPagination
    }
}
