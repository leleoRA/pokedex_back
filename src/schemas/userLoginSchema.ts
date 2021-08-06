import Joi from "joi";

const userLoginSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(6).required(),
})

export default userLoginSchema;