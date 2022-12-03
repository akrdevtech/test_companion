import Joi from "joi";
import { ECustomJoiErrors } from "../../../../../common/enums/global";
import { EAddStudentWizardBasicInfoFields, EAddStudentWizardContactInfoFields, EAddStudentWizardCourseInfoFields, EAddStudentWizardGaurdianInfoFields } from "../../../../../common/enums/student";
const { JoiStringValidationErrorMessages } = ECustomJoiErrors;


export type TBasicInfoValidatorSchema = typeof studentWizardFieldSchemas.basicInfoSchema;
export type TCourseInfoValidatorSchema = typeof studentWizardFieldSchemas.courseInfoSchema;
export type TContactInfoValidatorSchema = typeof studentWizardFieldSchemas.contactInfoSchema;
export type TGaurdianInfoValidatorSchema = typeof studentWizardFieldSchemas.gaurdianInfoSchema;

const studentWizardFieldSchemas = {
    basicInfoSchema: {
        [EAddStudentWizardBasicInfoFields.STUDENT_NAME]: Joi.string().min(3).required().messages(JoiStringValidationErrorMessages),
        [EAddStudentWizardBasicInfoFields.STUDENT_GENDER]: Joi.string().min(3).required().messages(JoiStringValidationErrorMessages),
        [EAddStudentWizardBasicInfoFields.STUDENT_DOB]: Joi.date().required(),
        [EAddStudentWizardBasicInfoFields.STUDENT_OCCUPATION]: Joi.string().optional().messages(JoiStringValidationErrorMessages),
    },
    contactInfoSchema: {
        [EAddStudentWizardContactInfoFields.STUDENT_EMAIL]: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        [EAddStudentWizardContactInfoFields.STUDENT_PHONE]: Joi.string().min(10).pattern(/^[0-9]+$/).required(),
        [EAddStudentWizardContactInfoFields.STUDENT_ADDRESS_LINE_1]: Joi.string().min(10).required(),
        [EAddStudentWizardContactInfoFields.STUDENT_ADDRESS_LINE_2]: Joi.string().min(10),
        [EAddStudentWizardContactInfoFields.STUDENT_PIN]: Joi.number().min(5),
    },
    courseInfoSchema: {
        [EAddStudentWizardCourseInfoFields.STUDENT_COURSE]: Joi.string().min(3).required(),
        [EAddStudentWizardCourseInfoFields.STUDENT_DATE_OF_ADMISSION]: Joi.date().required(),
        [EAddStudentWizardCourseInfoFields.STUDENT_ADMISSION_NUMBER]: Joi.string().min(5).required(),
    },
    gaurdianInfoSchema: {
        [EAddStudentWizardGaurdianInfoFields.STUDENT_GAURDIAN_NAME]: Joi.string().min(3).required(),
        [EAddStudentWizardGaurdianInfoFields.STUDENT_GAURDIAN_PHONE]: Joi.string().min(3),
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