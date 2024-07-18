import { validationResult } from "express-validator";

import { check } from 'express-validator'

import {

    existentUsername,
    existentGender,
    existentEmail

} from '../helpers/validate-db.js';

import { 
    
    maxCharactersName, 
    maxCharactersLastname, 
    maxCharactersUsername, 
    validYear,
    validMonth,
    validDate,
    validateBirthDate,
    validationPassword

 } from '../helpers/validate-fields.js'

export const validateUpdateTailUser = async (req, res, next) => {
    
    switch (true) {

        case req.body.name != null:

            await check("name").custom(maxCharactersName).run(req);

            break;
    
        case req.body.lastname != null:

            await check("lastname").custom(maxCharactersLastname).run(req);

            break;
    
        case req.body.username != null:

            await check("username").custom(existentUsername).run(req);
            
            await check("username").custom(maxCharactersUsername).run(req);
            
            break;
    
        case req.body.birthdate != null:
            
            await check("birthdate").custom(validYear).run(req);
            
            await check("birthdate").custom(validMonth).run(req);
            
            await check("birthdate").custom(validDate).run(req);
            
            await check("birthdate").custom(validateBirthDate).run(req);
            
            break;
    
        case req.body.gender != null:
            
            await check("gender").custom(existentGender).run(req);
            
            break;
    
        case req.body.email != null:
            
            await check("email").custom(existentEmail).run(req);
            
            break;
    
        case req.body.password != null:
            
            await check("password").custom(validationPassword).run(req);
            
            break;
    
        default:
            
            break;
    }

    next();

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }


}