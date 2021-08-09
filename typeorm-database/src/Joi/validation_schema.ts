import Joi from "joi";

export const authSchema = Joi.object({
    code: Joi.string().alphanum().min(8).max(8).required()
})

export const authEmail = Joi.object({
    customer_email: Joi.string().email().required()
})

export const authPage = Joi.object({
    page: Joi.number()
})

export const authId = Joi.object({
    id: Joi.number().required()
})

export const auth = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required()
})

