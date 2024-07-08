import { Router } from 'express';

import { check } from 'express-validator'

import { validateFields } from '../middlewares/validate-fields.js'

import { login, register } from './auth.controller.js'

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

        check('lastname', 'Lastname is required').not().isEmpty(),

        check('username', 'Username is required').not().isEmpty(),

        check('birthdate', 'birthdate is required').not().isEmpty(),

        check('gender', 'Gender is required').not().isEmpty(),

        check('email', 'Email is required').not().isEmpty(),

        check('password', 'Password is required').not().isEmpty(),

        check('phone', 'Phone is required').not().isEmpty(),
        
        validateFields

    ], register
    
)

export default router;