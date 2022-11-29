import React, { createContext, useReducer, Dispatch, ReactNode } from 'react';
import { EStepperStepStatus } from '../../../../../../common/components/VerticalLinearStepper/components/StepperStep';
import { EAddStudentWizardTabs } from '../../../../../../common/enums/student';
import { IAddStudentWizardState } from '../../../../../../common/interface/student';
import { dateHelpers } from '../../../../../../utils/dateHelpers';
import { AddStudentWizardActions } from './Actions';
import { AddStudentWizardReducer } from './Reducers';

const initialAddStudentWizardState: IAddStudentWizardState = {
    forms: {
        basicInfo: {
            name: { value: '', error: null },
            gender: { value: '', error: null },
            dateOfBirth: { value: dateHelpers.createDate(new Date(), 0, 0, -18), error: null },
            occupation: { value: '', error: null },
            hasErrors: false,
        },
        contactInfo: {
            email: { value: '', error: null },
            phone: { value: '', error: null },
            addressLine1: { value: '', error: null },
            addressLine2: { value: '', error: null },
            pin: { value: '', error: null },
            hasErrors: false,
        },
        courseInfo: {
            course: { value: '', error: null },
            dateOfAdmission: { value: new Date(), error: null },
            admissionNumber: { value: '', error: null },
            hasErrors: false,
        },
        gaurdianInfo: {
            nameOfGaurdian: { value: '', error: null },
            phoneOfGaurdian: { value: '', error: null },
            hasErrors: false,
        },
    },
    activeTab: EAddStudentWizardTabs.BASIC_INFO,
    verticalStepperSteps: [
        {
            step: 1,
            label: "BASIC INFO",
            status: EStepperStepStatus.PENDING,
            tabId: EAddStudentWizardTabs.BASIC_INFO,
        },
        {
            step: 2,
            label: "CONTACT INFO",
            status: EStepperStepStatus.PENDING,
            tabId: EAddStudentWizardTabs.CONTACT_INFO,
        },
        {
            step: 3,
            label: "COURSE INFO",
            status: EStepperStepStatus.PENDING,
            tabId: EAddStudentWizardTabs.COURSE_INFO,
        },
        {
            step: 4,
            label: "GAURDIAN INFO",
            status: EStepperStepStatus.PENDING,
            tabId: EAddStudentWizardTabs.GAURDIAN_INFO,
        }
    ],
    isWizardOpen: false,
    hasErrors: true,
};

const AddStudentWizardContext = createContext<{ state: IAddStudentWizardState; dispatch: Dispatch<AddStudentWizardActions> }>({
    state: initialAddStudentWizardState,
    dispatch: () => null
});

const mainReducer = (initialState: IAddStudentWizardState, action: AddStudentWizardActions) => AddStudentWizardReducer(initialState, action);

type AppProps = { children: ReactNode };

const AddStudentWizardStore = ({ children }: AppProps) => {
    const [state, dispatch] = useReducer(mainReducer, initialAddStudentWizardState);
    return (
        <AddStudentWizardContext.Provider value={{ state, dispatch }}>
            {children}
        </AddStudentWizardContext.Provider>
    )
}

export { AddStudentWizardStore, AddStudentWizardContext, initialAddStudentWizardState };