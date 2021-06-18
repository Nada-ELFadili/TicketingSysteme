const Joi = require('@hapi/joi');

//User validation
exports.ticketValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().required().min(10),
        type: Joi.string().required(),
        urgence: Joi.string().required(),
        description: Joi.string().required().min(10),
        userId: Joi.string().required()
    });
    return schema.validate(data);
}

