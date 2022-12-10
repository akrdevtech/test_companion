interface ICreateStudentRequestContactInfoSchema {
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    pin: number;
}

interface ICreateStudentRequestCourseInfoSchema {
    course: string;
    dateOfAdmission: Date;
    admissionNumber: string;
}

interface ICreateStudentRequestGaurdianInfoSchema {
    nameOfGaurdian: string;
    phoneOfGaurdian: string;
}
export interface ICreateStudentRequestSchema {
    name: string;
    gender: string;
    dateOfBirth: Date;
    occupation: string;
    contactInfo: ICreateStudentRequestContactInfoSchema,
    courseInfo: ICreateStudentRequestCourseInfoSchema,
    gaurdianInfo: ICreateStudentRequestGaurdianInfoSchema
}