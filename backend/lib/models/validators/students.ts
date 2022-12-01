import { IValidateAllSchema } from "@akrdevtech/lib-express-joi-validation-middleware";
import Joi from "joi";

export const getStudentAdmissionNumberSchema: IValidateAllSchema = {
    query: Joi.object({
        courseId: Joi.string().min(3).required(),
        dateOfAdmission: Joi.string().min(3).required(),
    })
}