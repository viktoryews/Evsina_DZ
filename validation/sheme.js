const Joi = require('joi');

/**
 * Схема валидации body
*/ 
const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    lastName: Joi.string().min(5).required(),
    age: Joi.number().min(0).max(100).required(),
    city: Joi.string().min(2),
});

/**
 * Схема валидации body
*/ 
const idSchema = Joi.object({
    id: Joi.required(),
});

module.exports = {userSchema, idSchema};