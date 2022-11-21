import Joi from "joi";
import { IValidateAllSchema } from "@akrdevtech/lib-express-joi-validation-middleware";

export const createCourseValidationSchema: IValidateAllSchema = {
    body: Joi.object({
        courseId: Joi.string().min(3).required(),
        courseName: Joi.string().min(3).required(),
        duration: Joi.number(),
        fee: Joi.number(),
        totalCredits: Joi.number(),
        minCredits: Joi.number(),
    })
}