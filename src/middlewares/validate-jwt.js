import jwt from 'jsonwebtoken';
import TailUser from '../tailUser/tailUser.model.js';

export const validateJWT = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({
            msg: "There is no token in the request",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);

        const tailUser = await TailUser.findById(uid);

        if (!tailUser) {
            return res.status(401).json({
                msg: 'Tail User does not exist in the database'
            });
        }

        switch (tailUser.status) {

            case 'inactive':

                return res.status(401).json({
                    msg: 'Token is not valid - user with state: INACTIVE'
                });


            case 'blocked':

                return res.status(401).json({
                    msg: 'Token is not valid - user with state: LOCKED'
                });

            default:

                break;

        }

        req.tailUser = tailUser;

        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Token is not valid",
        });
    }
}