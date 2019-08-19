const Joi = require('@hapi/joi');

const educationSchema = Joi.object().keys({
    school: Joi.string().required(),
    degree: Joi.string().required(),
    fieldofstudy: Joi.string().required(),
    from: Joi.date().required(),
    current: Joi.boolean(),
    to: Joi.when("current", {
        is: false,
        then: Joi.date().required()
    }),
    description: Joi.string()
})


module.exports = {
    educationSchema
}