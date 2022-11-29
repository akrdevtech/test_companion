import { IStepperStep } from "../components/VerticalLinearStepper/components/StepperStep";

export enum EStudentGraduationFilter {
    ANY = 'any',
    ONGOING = 'ongoing',
    COMPLETED = 'completed',
}
export enum EStudentAdmissionFilter {
    ANY = 'any',
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}
export enum EStudentPresenceFilter {
    ANY = 'any',
    ABSENT = 'absent',
    PRESENT = 'present',
}
export enum EStudentDetailTabs {
    PROFILE = 'profile',
    ATTENDANCE = 'attendance',
    PERFORMANCE = 'performance',
}
export enum EAddStudentWizardTabs {
    BASIC_INFO = "basicInfo",
    CONTACT_INFO = "contactInfo",
    COURSE_INFO = "courseInfo",
    GAURDIAN_INFO = "gaurdianInfo",
}
export enum EAddStudentWizardBasicInfoFields {
    STUDENT_NAME = "name",
    STUDENT_GENDER = "gender",
    STUDENT_DOB = "dateOfBirth",
    STUDENT_OCCUPATION = "occupation",
}
export enum EAddStudentWizardContactInfoFields {
    STUDENT_EMAIL = "email",
    STUDENT_PHONE = "phone",
    STUDENT_ADDRESS_LINE_1 = "addressLine1",
    STUDENT_ADDRESS_LINE_2 = "addressLine2",
    STUDENT_PIN = "pin",
}
export enum EAddStudentWizardCourseInfoFields {
    STUDENT_COURSE = "course",
    STUDENT_DATE_OF_ADMISSION = "dateOfAdmission",
    STUDENT_ADMISSION_NUMBER = "admissionNumber",
}
export enum EAddStudentWizardGaurdianInfoFields {
    STUDENT_GAURDIAN_NAME = "nameOfGaurdian",
    STUDENT_GAURDIAN_PHONE = "phoneOfGaurdian",
}



