import TailUser from "../tailUser/tailUser.model.js";

import validationTailUserModel from "../generalValidation/validationTailUser.model.js";

export const validateTailUser_Username = async (req, res, next) => {

    const { username } = req.params;

    const tailUser = await TailUser.findOne({ username });

    if(!tailUser) {

        return res.status(404).json({

            msg: `The user ${username} does not exist in database` 
        
        });

    }

    next();

}

export const validateTailUser_Role = async (req, res, next) => {

    const { role } = req.params;

    const tailUser = await validationTailUserModel.findOne({ role });

    if(!tailUser) {

        return res.status(404).json({

            msg: `The role ${role} does not exist in database`

        });

    }

    next();

}