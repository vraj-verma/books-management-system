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


    static bookSchema = joi.object({
        title: joi.string().min(2).max(50).required(),
        author: joi.string().min(2).max(20).required(),
        genre: joi.string().required(),
        publishedYear: joi.number().required(),
    });

    static borrowBookSchema = joi.object({
        books: joi.array().items(
            {
                bookId: joi.string().min(24).max(24).required(),
                borrowedAt: joi.string().required(),
            }
        )
    });

    static returnBookSchema = joi.object({
        returnedAt: joi.string().required(),
    });
}