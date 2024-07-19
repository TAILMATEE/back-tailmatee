import { Router } from 'express';

import { check } from 'express-validator';

import { validateFields } from '../middlewares/validate-fields.js';

import {

    createComment,

    getComments

} from './comment.controller.js';

import { validateJWT } from '../middlewares/validate-jwt.js';

import { haveRol } from '../middlewares/validate-role.js';

const router = Router();

router.post(

    '/',

    [

        validateJWT,

        haveRol('tailUser', 'tailAdmin', 'tailHouse', 'tailSupport'),

        check('date', 'Date is required').not().isEmpty(),

        check('text', 'Text is required').not().isEmpty(),

        check('idPost', 'IdPost is required').not().isEmpty(),

        validateFields,

    ], createComment

);

router.get('/',

    [

        validateJWT,

        haveRol('tailUser', 'tailAdmin', 'tailHouse', 'tailSupport'),

        validateFields

    ], getComments

);



export default router;