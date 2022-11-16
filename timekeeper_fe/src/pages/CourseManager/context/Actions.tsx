import { ActionMap } from "../../../common/types/global";

export type CourseActions = ActionMap<CourseActionsPayload>[keyof ActionMap<CourseActionsPayload>];
export enum CourseActionTypes {
    COURSE_DETAILS_TAB_CHANGE = 'COURSE-DETAILS-TAB-CHANGE',
}
export type CourseActionsPayload = {
    [CourseActionTypes.COURSE_DETAILS_TAB_CHANGE]: {};
}
