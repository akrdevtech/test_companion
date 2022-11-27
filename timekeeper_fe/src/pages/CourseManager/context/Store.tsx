import React, { createContext, useReducer, Dispatch, ReactNode } from 'react';
import { EStepperStepStatus } from '../../../common/components/VerticalLinearStepper/components/StepperStep';
import { EAddCourseWizardTabs, ECourseDetailTabs, ECourseStatus } from '../../../common/enums/course';
import { ICourseState } from '../../../common/interface/course';
import { CourseActions } from './Actions';
import { CourseReducer } from './Reducers';

const InitialCourseState: ICourseState = {
    coursesList: [],
    refreshCourseList: false,
    selectedCourseId: null,
    selectedCourseInfo: null,
    courseListPagination: {
        page: 0,
        limit: 12,
        totalPages: 0,
        totalCount: 0,
    },
    courseDetailsActiveTab: ECourseDetailTabs.BASIC,
    courseDetailsStudents: {
        studentList: [],
        pagination: {
            page: 0,
            limit: 10,
            totalPages: 0,
            totalCount: 0,
        },
        refreshStudentList: false,
        selectedStudentInCourseInfo: null,
    },
    appliedCourseListFilters: {
        search: "",
        status: ECourseStatus.ACTIVE,
    },
    isAddCourseWizardOpen: false,
};

const CourseContext = createContext<{ state: ICourseState; dispatch: Dispatch<CourseActions> }>({
    state: InitialCourseState,
    dispatch: () => null
});

const mainReducer = (initialState: ICourseState, action: CourseActions) => CourseReducer(initialState, action);

type AppProps = { children: ReactNode };

const CourseStore = ({ children }: AppProps) => {
    const [state, dispatch] = useReducer(mainReducer, InitialCourseState);
    return (
        <CourseContext.Provider value={{ state, dispatch }}>
            {children}
        </CourseContext.Provider>
    )
}

export { CourseStore, CourseContext, InitialCourseState };