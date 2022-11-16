import React, { createContext, useReducer, Dispatch, ReactNode } from 'react';
import { EStepperStepStatus } from '../../../../../../../common/components/VerticalLinearStepper/components/StepperStep';
import { dateHelpers } from '../../../../../../../utils/dateHelpers';
import { EAddStudentWizardTabs } from '../enums';
import { IAddStudentWizardState } from '../interface';
import { AddStudentWizardActions } from './Actions';
import { AddStudentWizardReducer } from './Reducers';

const initialState: IAddStudentWizardState = {
    basicInfo: {
        name: '',
        gender: '',
        dateOfBirth: dateHelpers.createDate(new Date(), 0, 0, -18),
        occupation: '',
    },
    contactInfo: {
        email: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        pin: '',
    },
    courseInfo: {
        course: '',
        dateOfAdmission: new Date(),
        admissionNumber: '',
    },
    gaurdianInfo: {
        nameOfGaurdian: '',
        phoneOfGaurdian: '',
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
    wizard: {
        open: false,
    }
};

const AddStudentWizardContext = createContext<{ state: IAddStudentWizardState; dispatch: Dispatch<AddStudentWizardActions> }>({
    state: initialState,
    dispatch: () => null
});

const mainReducer = (initialState: IAddStudentWizardState, action: AddStudentWizardActions) => AddStudentWizardReducer(initialState, action);

type AppProps = { children: ReactNode };

const AddStudentWizardStore = ({ children }: AppProps) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);
    return (
        <AddStudentWizardContext.Provider value={{ state, dispatch }}>
            {children}
        </AddStudentWizardContext.Provider>
    )
}

export { AddStudentWizardStore, AddStudentWizardContext };