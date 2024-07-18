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
    
    if (req.body.name != null) {
        await check("name").custom(maxCharactersName).run(req);
    }
    
    if (req.body.lastname != null) {
        await check("lastname").custom(maxCharactersLastname).run(req);
    }
    
    if (req.body.username != null) {
        await check("username").custom(existentUsername).run(req);
        await check("username").custom(maxCharactersUsername).run(req);
    }
    
    if (req.body.birthdate != null) {
        await check("birthdate").custom(validYear).run(req);
        await check("birthdate").custom(validMonth).run(req);
        await check("birthdate").custom(validDate).run(req);
        await check("birthdate").custom(validateBirthDate).run(req);
    }
    
    if (req.body.gender != null && req.body.gender != "") {
        await check("gender").custom(existentGender).run(req);
        console.log('porque entraste!!!');
    }
    
    if (req.body.email != null) {
        await check("email").custom(existentEmail).run(req);
    }
    
    if (req.body.password != null) {
        await check("password").custom(validationPassword).run(req);
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