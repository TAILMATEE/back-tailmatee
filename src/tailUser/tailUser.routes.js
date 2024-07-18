import { Router } from 'express';

import { check } from 'express-validator';

import { validateFields } from '../middlewares/validate-fields.js';

import {

    updateTailUser,
    getOwnTailUser,
    getTailUserProfile,
    getAllTailUser,
    getAllTailUserRoleFilter

} from './tailUser.controller.js';

import { validateUpdateTailUser } from '../middlewares/validate-Update.js';

import { validateJWT } from '../middlewares/validate-jwt.js';

import { haveRol } from '../middlewares/validate-role.js';

import { validateTailUser_Username, validateTailUser_Role } from '../middlewares/validate-Get.js';

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

router.get(

    '/',
    [

        validateJWT,

        haveRol('tailUser', 'tailAdmin', 'tailHouse', 'tailSupport'),

        validateFields

    ],getAllTailUser

)

router.get(

    "/filter/:role",
    [

        validateJWT,

        haveRol('tailUser', 'tailAdmin', 'tailHouse', 'tailSupport'),

        validateTailUser_Role,

        validateFields

    ], getAllTailUserRoleFilter

)

export default router;