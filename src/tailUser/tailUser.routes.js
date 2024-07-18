import { Router } from 'express';

import { check } from 'express-validator';

import { validateFields } from '../middlewares/validate-fields.js';

import {

    updateTailUser

} from './tailUser.controller.js';

import { validateUpdateTailUser } from '../middlewares/validate-Update.js';

import { validateJWT } from '../middlewares/validate-jwt.js';

import { haveRol } from '../middlewares/validate-role.js';

const router = Router();

router.put(

    '/',
    [

        validateJWT,

        haveRol('tailUser', 'tailAdmin', 'tailHouse', 'tailSupport'),

        validateUpdateTailUser,

        validateFields

    ], updateTailUser

)

export default router;