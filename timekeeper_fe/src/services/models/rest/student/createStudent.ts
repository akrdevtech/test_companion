import { IAddStudentWizardState } from "../../../../common/interface/student";

interface ICreateStudentRequestContactInfoSchema {
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    pin: number | string;
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

export const addStudentWizardStateFormSchemaToCreateStudentRequestSchema =
    (formData: IAddStudentWizardState['forms']): ICreateStudentRequestSchema => {
        const {
            basicInfo: { name, gender, occupation, dateOfBirth },
            contactInfo: { addressLine1, addressLine2, email, phone, pin },
            courseInfo: { course, dateOfAdmission, admissionNumber },
            gaurdianInfo: { phoneOfGaurdian, nameOfGaurdian }
        } = formData;
        return {
            name: name.value ?? "",
            gender: gender.value ?? "",
            occupation: occupation.value ?? "",
            dateOfBirth: dateOfBirth.value ?? new Date(),
            contactInfo: {
                email: email.value ?? "",
                phone: phone.value ?? "",
                pin: pin.value ?? "",
                addressLine1: addressLine1.value ?? "",
                addressLine2: addressLine2.value ?? ""
            },
            courseInfo: {
                course: course.value ?? "",
                admissionNumber: admissionNumber.value ?? "",
                dateOfAdmission: dateOfAdmission.value ?? new Date(),
            },
            gaurdianInfo: {
                nameOfGaurdian: nameOfGaurdian.value ?? "",
                phoneOfGaurdian: phoneOfGaurdian.value ?? ""
            }
        }
    }