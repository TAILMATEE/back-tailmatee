import { Router } from 'express';

import { check } from 'express-validator';

import { validateFields } from '../middlewares/validate-fields.js'

import { 
    
    createDenoucement, 
    acceptDenoucement, 
    denyDenoucement, 
    getPendingDenoucement, 
    getAproveDenoucement,
    getDenyDenoucement 

} from '../denoucement/denoucement.controller.js';

import {  validateJWT } from '../middlewares/validate-jwt.js'

import { haveRol } from '../middlewares/validate-role.js'

import {

    validYear,
    validMonth,
    validDate,

} from '../helpers/validate-fields.js'

const router = Router();

router.put(

    '/:_id/accept',
    [

        validateJWT,

        haveRol('tailAdmin', 'tailSupport'),

        check('_id', 'Id is required').not().isEmpty(),

        validateFields
    
    ], acceptDenoucement

)

router.delete(

    '/:_id/deny',
    [

        validateJWT,

        haveRol('tailAdmin', 'tailSupport'),

        check('_id', 'Id is required').not().isEmpty(),

        validateFields
    
    ], denyDenoucement


)

router.post(

    '/',
    [

        validateJWT,

        haveRol('tailUser', 'tailAdmin', 'tailHouse', 'tailSupport'),

        check('dateAndTime', 'Date and time is required').not().isEmpty(),

        check('typeOfPet', 'Type of pet is required').not().isEmpty(),

        check('typeOfAbuse', 'Type of abuse is required').not().isEmpty(),

        check('description', 'Description is required').not().isEmpty(),

        validateFields,
    ], createDenoucement

)

router.get('/',

    [

        validateJWT,

        haveRol('tailAdmin', 'tailSupport'),

        validateFields

    ], getPendingDenoucement

)

router.get('/aproved',

    [

        validateJWT,

        haveRol('tailAdmin', 'tailSupport'),

        validateFields

    ], getAproveDenoucement

)

router.get('/deny',

    [

        validateJWT,

        haveRol('tailAdmin', 'tailSupport'),

        validateFields

    ], getDenyDenoucement

)

export default router;