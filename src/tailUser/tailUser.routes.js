import { Router } from 'express';

import { check } from 'express-validator';

import { validateFields } from '../middlewares/validate-fields.js';

import {

    updateTailUser,
    getOwnTailUser,
    getTailUserProfile

} from './tailUser.controller.js';

import { validateUpdateTailUser } from '../middlewares/validate-Update.js';

import { validateJWT } from '../middlewares/validate-jwt.js';

import { haveRol } from '../middlewares/validate-role.js';

import { validateTailUser_Username } from '../middlewares/validate-Get.js';

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

router.get(

    '/ownProfile',
    [
        validateJWT,

        haveRol('tailUser', 'tailAdmin', 'tailHouse', 'tailSupport'),

        validateFields

    ],getOwnTailUser

);

router.get(

    '/:username',

    [

        validateJWT,

        haveRol('tailUser', 'tailAdmin', 'tailHouse', 'tailSupport'),

        validateTailUser_Username,

        validateFields

    ], getTailUserProfile

)

export default router;