const Joi = require('@hapi/joi');

const educationSchema = Joi.object().keys({
    school: Joi.string().required(),
    degree: Joi.string().required(),
    fieldofstudy: Joi.string().required(),
    from: Joi.date().required(),
    to: Joi.date(),
    current: Joi.boolean(),
    description: Joi.string()
})


module.exports = {
    educationSchema
}