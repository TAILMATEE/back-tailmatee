import { Router } from 'express';

import { check } from 'express-validator'

import { validateFields } from '../middlewares/validate-fields.js'

import { login, register } from './auth.controller.js'

import { existentUsername } from '../helpers/validate-db.js'

import { maxCharactersName, maxCharactersLastname, maxCharactersUsername, validYear } from '../helpers/validate-fields.js'

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

        check('gender', 'Gender is required').not().isEmpty(),

        check('email', 'Email is required').not().isEmpty(),

        check('password', 'Password is required').not().isEmpty(),

        check('phone', 'Phone is required').not().isEmpty(),

        validateFields

    ], register
    
)

export default router;