import Joi from "joi";

const authSchema = Joi.object({
    code: Joi.string().alphanum().min(8).max(8)
})

export default authSchema