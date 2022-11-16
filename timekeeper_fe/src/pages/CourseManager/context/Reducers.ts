import { ICourseState } from "../../../common/interface/course";
import { CourseActions, CourseActionsPayload, CourseActionTypes } from "./Actions";

export const CourseReducer = (state: ICourseState, action: CourseActions) => {
    switch (action.type) {
        case CourseActionTypes.COURSE_DETAILS_TAB_CHANGE:
            return {
                ...state,
            }
        default:
            return state;
    }
}
