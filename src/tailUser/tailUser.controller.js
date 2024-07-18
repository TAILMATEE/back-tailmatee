import TailUser from '../tailUser/tailUser.model.js';

import { withoutTime } from '../../configs/defaultCredentials.js';

import { calculateAge } from '../auth/auth.controller.js'

export const updateTailUser = async (req, res) => {

    const { _id, age, imgProfile, role, typeAccount, status, __v, ...rest} = req.body;

    await TailUser.findOneAndUpdate({ _id: req.tailUser._id }, rest);

    const findTailUser = await TailUser.findOne({ _id: req.tailUser._id});

    if(rest.birthdate != null){

        const formatDate = withoutTime(rest.birthdate);

        const newAge = calculateAge(formatDate);

        await TailUser.findOneAndUpdate({ _id: req.tailUser._id }, { age: newAge });

        await findTailUser.save();

    }

    if(rest.password != null){

        const salt = bcryptjs.genSaltSync();

        rest.password = bcryptjs.hashSync(rest.password, salt);

        await findTailUser.save();

    }

    res.status(200).json({

        msg: `${req.tailUser.username} your profile was updated`,
        findTailUser

    })



}