import Joi from "joi";

export const authSchema = Joi.object({
    code: Joi.string().alphanum().min(8).max(8)
})

export const authEmail = Joi.object({
    email: Joi.string().email().required()
})

