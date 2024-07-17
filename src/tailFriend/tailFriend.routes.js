'use strict';

import {Router} from 'express'
import {validateFields, validateUsernameTailFriend} from '../middlewares/validate-fields.js'
import {validateJWT} from '../middlewares/validate-jwt.js'
import { getTailFriend, getTailFriends, postTailFriend, putTailFriend } from './tailFriend.controller.js';
import { check } from 'express-validator';
import { validateGender,validateStatusTailFriend } from '../helpers/validate-fields.js';
import { validateMyTailFriend } from '../helpers/validate-db.js';

const router = Router()

router.post('/',
    [
    validateJWT,
    check('name','Name is required').not().isEmpty(),
    check('category','Category is required').not().isEmpty(),
    check('specie','Specie is required').not().isEmpty(),
    check('race','Race is required').not().isEmpty(),
    check('gender','Gender is required').not().isEmpty(),
    check('gender').custom(validateGender),
    check('description','Description is required').not().isEmpty(),
    check('status').custom(validateStatusTailFriend),
    validateFields,
], postTailFriend);

router.put('/',[
    validateJWT,
    validateUsernameTailFriend,
    validateMyTailFriend,
],putTailFriend)

router.get('/',[
    validateJWT,
],getTailFriend)

router.get('/tailFriends',[
    validateJWT,
],getTailFriends)

export default router;