const Joi = require('@hapi/joi');

//Assign validation
exports.assignValidation = (data) => {
    const schema = Joi.object({
        idTicket: Joi.string().required(),
        idUser: Joi.string().required(),
        idTech: Joi.string().required(),
        moreInfo: Joi.string().required(),
        state: Joi.string()
    });
    return schema.validate(data);
}

