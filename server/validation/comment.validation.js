const Joi = require('@hapi/joi');

const commentValSchema = Joi.object().keys({
    text: Joi.string().min(10).max(300).required(),
    name: Joi.string(),
    avatar: Joi.string()
    //name and avatar will come from the front end 
})

module.exports = {
    commentValSchema
}