
import {check} from 'express-validator';
import {Router} from 'express';
import { validateFields} from '../middlewares/validate-fields.js'
import {validateFieldImage} from '../middlewares/validate-Image.js';
import {validateJWT} from '../middlewares/validate-jwt.js';
import { acceptTailHousePetitions, getTailHousePetition, getTailHousePetitions, postTailHousePetition } from './tailHousePetition.controller.js';
import { validatePlaceIsYours } from '../middlewares/validate-fields.js';
import {haveRol} from '../middlewares/validate-role.js';
const router = Router();

router.post('/form',[
    validateJWT,
    check('nameManager','The name of the manager is required').not().isEmpty(),
    validateFieldImage('dpiPhotoManager','placePhotos'),
    check('placeIsYours','The place is yours is required').not().isEmpty(),
    check('receiveVisit','The receive visit is required').not().isEmpty(),
    validatePlaceIsYours,
    validateFields,
],postTailHousePetition)

router.get('/',[
    validateJWT,
    haveRol('tailSupport')
],getTailHousePetitions)

router.get('/petition/:id',[
    validateJWT,
    haveRol('tailSupport')
],getTailHousePetition)

router.post('/',[
    validateJWT,
    haveRol('tailSupport'),
    check('idTailHousePetition','The petition is required').not().isEmpty(),
    validateFields,
],acceptTailHousePetitions)

export default router;