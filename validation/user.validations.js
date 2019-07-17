const Joi = require('@hapi/joi');

const registerSchema = Joi.object().keys({
    name: Joi.string().required().trim().alphanum().min(4).max(30),
    email: Joi.string().required().regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/),
    password: Joi.string().required().min(6).max(30),
    password2: Joi.string().required().valid(Joi.ref('password'))
})

const loginSchema = Joi.object().keys({
    email: Joi.string().required().regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/),
    password: Joi.string().required()

})

module.exports = {
    registerSchema,
    loginSchema
}