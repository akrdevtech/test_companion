import { ICourseState } from "../../../common/interface/course";
import { CourseActions, CourseActionsPayload, CourseActionTypes } from "./Actions";

export const CourseReducer = (state: ICourseState, action: CourseActions): ICourseState => {
    switch (action.type) {
        case CourseActionTypes.COURSE_DETAILS_TAB_CHANGE:
            return {
                ...state,
            }
        case CourseActionTypes.COURSE_LIST_FILTER_CHANGE:
            return {
                ...state,
                appliedCourseListFilters: action.payload.appliedCourseListFilters,
            }
        case CourseActionTypes.COURSE_LIST_PAGINATION_CHANGE:
            return {
                ...state,
                courseListPagination: action.payload.courseListPagination,
            }
        case CourseActionTypes.ADD_COURSE_WIZARD_OPEN:
            return {
                ...state,
                isAddCourseWizardOpen: true,
            }
        case CourseActionTypes.ADD_COURSE_WIZARD_CLOSE:
            return {
                ...state,
                isAddCourseWizardOpen: false,
            }
        default:
            return state;
    }
}
