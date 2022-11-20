import React, { createContext, useReducer, Dispatch, ReactNode } from 'react';
import { EStepperStepStatus } from '../../../../../common/components/VerticalLinearStepper/components/StepperStep';
import { EAddCourseWizardTabs } from '../../../../../common/enums/course';
import { IAddCourseWizardState } from '../../../../../common/interface/course';
import { IAddCourseWizardActions } from './Actions';
import { CourseReducer } from './Reducers';

const InitialAddCourseWizardState: IAddCourseWizardState = {
    activeTab: EAddCourseWizardTabs.BASIC_INFO,
    verticalStepperSteps: [
        {
            step: 1,
            label: "BASIC INFO",
            status: EStepperStepStatus.PENDING,
            tabId: EAddCourseWizardTabs.BASIC_INFO,
        }
    ],
    forms: {
        basicInfo: {
            courseId: { value: '', error: null },
            courseName: { value: '', error: null },
            duration: { value: 0, error: null },
            fee: { value: 0, error: null },
            totalCredits: { value: 0, error: null },
            minCredits: { value: 0, error: null },
            hasErrors: false,
        }
    },
    isWizardOpen: false,
    hasErrors: true,
};

const AddCourseWizardContext = createContext<{ state: IAddCourseWizardState; dispatch: Dispatch<IAddCourseWizardActions> }>({
    state: InitialAddCourseWizardState,
    dispatch: () => null
});

const mainReducer = (initialState: IAddCourseWizardState, action: IAddCourseWizardActions) => CourseReducer(initialState, action);

type AppProps = { children: ReactNode };

const AddCourseWizardStore = ({ children }: AppProps) => {
    const [state, dispatch] = useReducer(mainReducer, InitialAddCourseWizardState);
    return (
        <AddCourseWizardContext.Provider value={{ state, dispatch }}>
            {children}
        </AddCourseWizardContext.Provider>
    )
}

export { AddCourseWizardStore, AddCourseWizardContext, InitialAddCourseWizardState};