import React, { createContext, useReducer, Dispatch, ReactNode } from 'react';
import { ECourseDetailTabs } from '../../../common/enums/course';
import { ICourseState } from '../../../common/interface/course';
import { CourseActions } from './Actions';
import { CourseReducer } from './Reducers';

const initialState: ICourseState = {
    coursesList: [],
    refreshCourseList: false,
    selectedCourseId: null,
    selectedCourseInfo: null,
    isAddCourseWizardOpen: false,
    courseListPagination: {
        page: 0,
        limit: 10,
        totalPages: 0,
    },
    courseDetailsActiveTab: ECourseDetailTabs.BASIC,
    courseDetailsStudents: {
        studentList: [],
        pagination: {
            page: 0,
            limit: 10,
            totalPages: 0,
        },
        refreshStudentList: false,
        selectedStudentInCourseInfo: null,
    }
};

const CourseContext = createContext<{ state: ICourseState; dispatch: Dispatch<CourseActions> }>({
    state: initialState,
    dispatch: () => null
});

const mainReducer = (initialState: ICourseState, action: CourseActions) => CourseReducer(initialState, action);

type AppProps = { children: ReactNode };

const CourseStore = ({ children }: AppProps) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);
    return (
        <CourseContext.Provider value={{ state, dispatch }}>
            {children}
        </CourseContext.Provider>
    )
}

export { CourseStore, CourseContext };