import Joi from "joi";

export const authSchema = Joi.object({
    code: Joi.string().alphanum().min(8).max(8).required()
})

export const authEmail = Joi.object({
    customer_email: Joi.string().email().required()
})

export const authPage = Joi.object({
    page: Joi.number().required()
})

export const authName = Joi.object({
    name: Joi.string().required().alphanum()
})

export const authAddress = Joi.object({
    address: Joi.string().required().alphanum()
})

//preguntar si se pueden hacer menos validaciones
