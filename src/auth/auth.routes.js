import { Router } from 'express';

import { check } from 'express-validator'

import { validateFields } from '../middlewares/validate-fields.js'

import { login } from './auth.controller.js'

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

export default router;