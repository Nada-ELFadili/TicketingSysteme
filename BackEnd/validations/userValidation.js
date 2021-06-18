const Joi = require('@hapi/joi');

//User validation
const userValidation = (data) => {
    const schema = Joi.object({
        fname: Joi.string().required().min(4),
        lname: Joi.string().required().min(4),
        username: Joi.string().required().min(4),
        password: Joi.string().required().min(4),
        type: Joi.string().required(),
        email: Joi.string().required().email(),
        state: Joi.string()
    });
    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().min(4),
        password: Joi.string().required().min(4)
    });
    return schema.validate(data);
}

module.exports = {userValidation,loginValidation};