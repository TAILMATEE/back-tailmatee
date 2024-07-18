import { Router } from 'express';

import { check } from 'express-validator';

import { validateFields } from '../middlewares/validate-fields.js'

import { createDenoucement, acceptDenoucement, denyDenoucement } from '../denoucement/denoucement.controller.js';

import {  validateJWT } from '../middlewares/validate-jwt.js'

import { haveRol } from '../middlewares/validate-role.js'

import {

    validYear,
    validMonth,
    validDate,

} from '../helpers/validate-fields.js'

const router = Router();

router.put(

    '/:id/accept',
    [

        validateJWT,

        haveRol('tailAdmin', 'tailSupport'),

        check('id', 'Id is required').not().isEmpty(),

        validateFields
    
    ], acceptDenoucement

)

router.put(

    '/:id/deny',
    [

        validateJWT,

        haveRol('tailAdmin', 'tailSupport'),

        check('id', 'Id is required').not().isEmpty(),

        validateFields
    
    ], denyDenoucement


)

router.post(

    '/',
    [

        validateJWT,

        haveRol('tailUser', 'tailAdmin', 'tailHouse', 'tailSupport'),

        check('dateAndTime', 'Date and time is required').not().isEmpty(),

        check('dateAndTime').custom(validYear),

        check('dateAndTime').custom(validMonth),

        check('dateAndTime').custom(validDate),

        check('typeOfPet', 'Type of pet is required').not().isEmpty(),

        check('typeOfAbuse', 'Type of abuse is required').not().isEmpty(),

        check('description', 'Description is required').not().isEmpty(),

        validateFields,
    ], createDenoucement

)

export default router;