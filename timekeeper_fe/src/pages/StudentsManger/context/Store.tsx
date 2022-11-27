import React, { createContext, useReducer, Dispatch, ReactNode } from 'react';
import {
    EStudentAdmissionFilter,
    EStudentDetailTabs,
    EStudentGraduationFilter,
    EStudentPresenceFilter
} from '../../../common/enums/student';
import { IStudentState } from '../../../common/interface/student';
import { StudentActions } from './Actions';
import { StudentReducer } from './Reducers';

const today: Date = new Date();
const initialState: IStudentState = {
    studentsList: [],
    refreshStudentList: false,
    selectedStudentId: undefined,
    selectedStudentInfo: undefined,
    selectedStudentAttendance: {
        selectedYear: today.getFullYear(),
        selectedMonth: today.getMonth(),
        selectedMonthAttendance: [],
        selectedDate: null,
        clockedIn: null,
        clockedOut: null,
        totalAttendance: 0,
        thisMonthAttendance: 0,
        refreshAttendanceCalendar: false,
    },
    isAddStudentWizardOpen: false,
    studentListPagination: {
        page: 0,
        limit: 14,
        totalPages: 0,
        totalCount: 0,
    },
    appliedStudentListFilters: {
        admission: EStudentAdmissionFilter.ACTIVE,
        graduation: EStudentGraduationFilter.ONGOING,
        presence: EStudentPresenceFilter.PRESENT,
        course: 'any',
        search: '',
    },
    filterTrayToggle: false,
    studentDetailsActiveTab: EStudentDetailTabs.PROFILE,
};

const StudentContext = createContext<{ state: IStudentState; dispatch: Dispatch<StudentActions> }>({
    state: initialState,
    dispatch: () => null
});

const mainReducer = (initialState: IStudentState, action: StudentActions) => StudentReducer(initialState, action);

type AppProps = { children: ReactNode };

const StudentStore = ({ children }: AppProps) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);
    return (
        <StudentContext.Provider value={{ state, dispatch }}>
            {children}
        </StudentContext.Provider>
    )
}

export { StudentStore, StudentContext };