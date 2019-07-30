const Joi = require('@hapi/joi');

const experienceSchema = Joi.object().keys({
    title: Joi.string().required(),
    company: Joi.string().required(),
    location: Joi.string(),
    from: Joi.date().required(),
    current: Joi.boolean(),
    to: Joi.when("current", {
        is: false,
        then: Joi.date().required()
    }),
    description: Joi.string()
})

module.exports = {
    experienceSchema
}