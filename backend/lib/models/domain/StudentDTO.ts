import { ICreateStudentRequestSchema } from "../rest/student/createStudent";
import { IStudentsModel } from "../../interfaces/students";
import { UserGenders, UserRoles } from "../../enums/users";

export class StudentDTO {
    constructor() { }
    public fromCreateRequestToDb(raw: ICreateStudentRequestSchema): IStudentsModel {
        const {
            name,
            dateOfBirth,
            contactInfo: {
                addressLine1,
                addressLine2,
                email,
                phone,
                pin
            },
            courseInfo: {
                course,
                dateOfAdmission,
                admissionNumber
            },
            gender,
            occupation,
            gaurdianInfo: {
                nameOfGaurdian,
                phoneOfGaurdian,
            }
        } = raw;
        const [fName, lName] = name.split(" ");
        return {
            firstName: fName,
            lastName: lName,
            occupation,
            dateOfBirth: new Date(dateOfBirth),
            gender: gender as UserGenders,
            gaurdianInfo: { nameOfGaurdian, phoneOfGaurdian },
            performanceInfo: {
                listening: 0, speaking: 0, reading: 0, writing1: 0, writing2: 0, speakinAdvanced: { F: 0, S: 0, L: 0, V: 0 }
            },
            settings: {
                hasGraduated: false, isActive: true, isPresent: false,
                role: UserRoles.STUDENT, username: email, password: phone,
            },
            attendance: [],
            contactInfo: {
                addressLine1, addressLine2, email, phone, pin: pin.toString()
            },
            courseInfo: {
                course, admissionNumber, dateOfAdmission: new Date(dateOfAdmission),
            },
        }
    }
}