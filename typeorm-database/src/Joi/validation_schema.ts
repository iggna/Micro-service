import Joi from "joi";

export const authSchema = Joi.object({
    code: Joi.string().alphanum().equal(8)
})

export const authEmail = Joi.object({
    customer_email: Joi.string().email().required()
})

export const authPage = Joi.object({
    page: Joi.number().required()
})

export const authName = Joi.object({
    name: Joi.string().required()
})

export const authAddress = Joi.object({
    address: Joi.string().required()
})

//preguntar si se pueden hacer menos validaciones
