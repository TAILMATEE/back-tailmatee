import { Router } from 'express';

import { check } from 'express-validator';

import { validateFields } from '../middlewares/validate-fields.js';

import {

    createPost,

    getPosts

} from './post.controller.js';

import { validateJWT } from '../middlewares/validate-jwt.js';

import { haveRol } from '../middlewares/validate-role.js';

import { validateTailFriend } from '../helpers/validate-db.js';

const router = Router();

router.post(

    '/',

    [

        validateJWT,

        haveRol('tailUser', 'tailAdmin', 'tailHouse', 'tailSupport'),

        check('text', 'Text is required').not().isEmpty(),

        check('date', 'Date is required').not().isEmpty(),

        check('tailFriend', 'TailFriend is required').not().isEmpty(),

        check('tailFriend').custom(validateTailFriend),

        validateFields
        
    ], createPost

)

router.get(

    '/',

    [

        validateJWT,

        haveRol('tailUser', 'tailAdmin', 'tailHouse', 'tailSupport'),

        validateFields

    ], getPosts

)

export default router;