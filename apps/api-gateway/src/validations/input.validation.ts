import * as joi from 'joi';

export class InputValidation {

    static paginationSchema = joi.object({
        offset: joi.number().integer().default(0).optional(),
        limit: joi.number().integer().default(10).optional(),
        search: joi.string().default('').optional().allow(null, ''),
    })

    static signupSchema = joi.object({
        name: joi.string().min(2).max(20).required(),
        email: joi.string().email().required(),
        password: joi.string().alphanum().min(6).max(100)
    });

    static signinSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().alphanum().min(6).max(100)
    });

    static deleteSchema = joi.object({
        email: joi.string().email().required(),
    });
}