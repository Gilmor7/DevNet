const Joi = require('@hapi/joi');

const experienceSchema = Joi.object().keys({
    title: Joi.string().required(),
    company: Joi.string().required(),
    location: Joi.string(),
    from: Joi.date().required(),
    to: Joi.date(),
    current: Joi.boolean(),
    description: Joi.string()
})

module.exports = {
    experienceSchema
}