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
        case CourseActionTypes.COURSE_LIST_GET_UPDATED:
            return {
                ...state,
                courseListPagination: action.payload.courseListPagination,
                coursesList: action.payload.coursesList,
                refreshCourseList: action.payload.refreshCourseList,
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
                refreshCourseList: action.payload.refreshCourseList ?? false,
            }
        case CourseActionTypes.COURSE_LIST_SELECT_COURSE:
            return {
                ...state,
                selectedCourseId: action.payload.selectedCourseId,
                selectedCourseInfo: action.payload.selectedCourseInfo,
            }
        case CourseActionTypes.COURSE_LIST_REFRESH:
            return {
                ...state,
                refreshCourseList: true,
            }
        default:
            return state;
    }
}
