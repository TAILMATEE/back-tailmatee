import { Router } from 'express';

import { check } from 'express-validator'

import { validateFields } from '../middlewares/validate-fields.js'

import { login, register } from './auth.controller.js'

import { 

    existentUsername,
    existentGender,
    existentEmail

 } from '../helpers/validate-db.js'

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

import csrfProtection  from '../middlewares/csrfProtection.js'

const router = Router();

router.post(

    '/login',
    [

        check('usernameOrEmail', 'Username or Email is required').not().isEmpty(),

        check('password', 'Password is required').not().isEmpty(),

        validateFields

    ], login

);

router.post(

    '/register',
    [

        check('name', 'Name is required').not().isEmpty(),

        check('name').custom(maxCharactersName),

        check('lastname', 'Lastname is required').not().isEmpty(),

        check('lastname').custom(maxCharactersLastname),

        check('username', 'Username is required').not().isEmpty(),

        check('username').custom(existentUsername),

        check('username').custom(maxCharactersUsername),

        check('birthdate', 'birthdate is required').not().isEmpty(),

        check('birthdate').custom(validYear),

        check('birthdate').custom(validMonth),

        check('birthdate').custom(validDate),

        check('birthdate').custom(validateBirthDate),

        check('gender', 'Gender is required').not().isEmpty(),

        check('gender').custom(existentGender),

        check('email', 'Email is required').not().isEmpty(),

        check('email', 'Email is not valid').isEmail(),

        check('email').custom(existentEmail),

        check('password', 'Password is required').not().isEmpty(),

        check('password').custom(validationPassword),

        check('phone', 'Phone is required').not().isEmpty(),

        validateFields

    ], register
    
)

export default router;