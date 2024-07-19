import {Router} from 'express';

import {validateJWT} from '../middlewares/validate-jwt.js';
import {validateIdTailHouseParam} from '../middlewares/validate-fields.js';
import { getTailHouseById, getTailHouses, putTailHouse } from './tailHouse.controller.js';
import { haveRol } from '../middlewares/validate-role.js'

const router = Router();

router.put('/:idTailHouse',[
    validateJWT,
    haveRol('tailHouse','tailSupport','tailAdmin'),
    validateIdTailHouseParam
], putTailHouse)

router.get('/',[
    validateJWT,
], getTailHouses)

router.get('/:idTailHouse',[
    validateJWT,
    validateIdTailHouseParam,
], getTailHouseById)

export default router;