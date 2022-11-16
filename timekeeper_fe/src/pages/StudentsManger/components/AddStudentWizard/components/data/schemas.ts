import Joi from "joi";


const studentWizardFieldSchemas = {
    basicInfoSchema: {
        name: Joi.string().min(3).required(),
        gender: Joi.string().min(3).required(),
        dateOfBirth: Joi.date().required(),
        occupation: Joi.string(),
    },
    contactInfoSchema: {
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        phone: Joi.string().min(10).pattern(/^[0-9]+$/).required(),
        addressLine1: Joi.string().min(10).required(),
        addressLine2: Joi.string().min(10),
        pin: Joi.number().min(5),
    },
    courseInfoSchema: {
        course: Joi.string().min(3).required(),
        dateOfAdmission: Joi.date().required(),
        admissionNumber: Joi.string().min(5).required(),
    },
    gaurdianInfoSchema: {
        nameOfGaurdian: Joi.string().min(3).required(),
        phoneOfGaurdian: Joi.string().min(3),
    }
}
const basicInfoSchema = Joi.object(studentWizardFieldSchemas.basicInfoSchema);
const contactInfoSchema = Joi.object(studentWizardFieldSchemas.contactInfoSchema);
const courseInfoSchema = Joi.object(studentWizardFieldSchemas.courseInfoSchema);
const gaurdianInfoSchema = Joi.object(studentWizardFieldSchemas.gaurdianInfoSchema);

const AddStudentWizardSchemas = {
    basicInfoSchema,
    contactInfoSchema,
    courseInfoSchema,
    gaurdianInfoSchema,
    studentWizardFieldSchemas,
}

export default AddStudentWizardSchemas