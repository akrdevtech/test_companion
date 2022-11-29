import Joi from "joi";
import { EAddCourseWizardBasicInfoFields } from "../../../../../common/enums/course";
import { ECustomJoiErrors } from "../../../../../common/enums/global";

const { JoiStringValidationErrorMessages,JoiNumberValidationErrorMessages } = ECustomJoiErrors
const courseWizardFieldSchemas = {
    basicInfoSchema: {
        [EAddCourseWizardBasicInfoFields.COURSE_ID]: Joi.string().min(3).required().messages(JoiStringValidationErrorMessages),
        [EAddCourseWizardBasicInfoFields.COURSE_NAME]: Joi.string().min(3).required().messages(JoiStringValidationErrorMessages),
        [EAddCourseWizardBasicInfoFields.DURATION]: Joi.number().messages(JoiNumberValidationErrorMessages),
        [EAddCourseWizardBasicInfoFields.FEE]: Joi.number().messages(JoiNumberValidationErrorMessages),
        [EAddCourseWizardBasicInfoFields.TOTAL_CREDITS]: Joi.number().messages(JoiNumberValidationErrorMessages),
        [EAddCourseWizardBasicInfoFields.MIN_CREDITS]: Joi.number().messages(JoiNumberValidationErrorMessages),
    }
}
const basicInfoSchema = Joi.object(courseWizardFieldSchemas.basicInfoSchema);
const AddCourseWizardSchemas = {
    basicInfoSchema,
    courseWizardFieldSchemas,
}
export default AddCourseWizardSchemas