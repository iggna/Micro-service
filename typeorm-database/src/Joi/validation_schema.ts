import Joi from "joi";

export const authSchema = Joi.object({
    code: Joi.string().alphanum().equal(8)
})

export const authEmail = Joi.object({
    customer_email: Joi.string().email().required()
})

