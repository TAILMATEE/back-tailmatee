import {Router} from 'express';

import { validateJWT } from '../middlewares/validate-jwt.js';
import { getAdoptionPetitions, postAdoption } from './adoption.controller.js';
import { check } from 'express-validator';
import { validateFields, validateUsernameTailFriend } from '../middlewares/validate-fields.js';
import { validateExistsTailFriend } from '../helpers/validate-db.js';
import { haveRol } from '../middlewares/validate-role.js';

const router = Router();

router.post('/form',[
    validateJWT,
    check('occupation','Occupation is required').not().isEmpty(),
    check('civilStatus','Civil status is required').not().isEmpty(),
    check('civilStatus',' Civil status must be one of the following: SINGLE, MARRIED, DIVORCED, WIDOWED').isIn(['MARRIED','SINGLE','DIVORCIED','WIDOWER']),
    check('whyAdopt','Why adopt is required').not().isEmpty(),
    check('hasPet','Has pet is required').not().isEmpty(),
    check('howManyPet','How many pet is numeric and required').not().isEmpty().isNumeric(),
    check('previouslyHasPet','Previously has pet is required').not().isEmpty(),
    check('whatHappen','What happen must be a string').not().isEmpty(),
    check('howManyPeople','How many people is Numerico and required').not().isEmpty().isNumeric(),
    check('areThereChildren','Are there children is required').not().isEmpty(),
    check('howManyChildren','How many children is required').not().isEmpty().isNumeric(),
    check('rentHouse','Rent house is required').not().isEmpty(),
    check('allowPet','Allow pet is required').not().isEmpty(),
    check('financialCapacity','Financial capacity is required').not().isEmpty(),
    check('economicRange','Economic range is required').not().isEmpty(),
    check('usernameTailFriend').custom(validateExistsTailFriend),
    validateFields,
    validateUsernameTailFriend,
],postAdoption)

router.get('/',[
    validateJWT,
    haveRol('tailAdmin'),
],getAdoptionPetitions)

export default router;