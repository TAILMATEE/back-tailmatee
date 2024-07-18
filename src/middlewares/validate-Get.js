import TailUser from "../tailUser/tailUser.model.js";

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