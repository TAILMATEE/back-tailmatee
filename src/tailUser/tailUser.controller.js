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

export const getOwnTailUser = async (req, res) => {

    const { limit, from } = req.query;

  const query = { _id: req.tailUser._id };

  const [total, tailUser] = await Promise.all([
    TailUser.countDocuments(query),
    TailUser.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.status(200).json({
    msg: `${req.tailUser.username} your profile is:`,
    tailUser,
  });

}

export const getTailUserProfile = async (req, res) => {

    const { limit, from } = req.query;

    const { username } = req.params;

    const  query = { username: username };

    const [total, tailUser] = await Promise.all([
        TailUser.countDocuments(query),
        TailUser.find(query).skip(Number(from)).limit(Number(limit)),
      ]);
    
    res.status(200).json({
        msg: `${req.tailUser.username} the profile ${username} is:`,
        tailUser,
    });

}

export const getAllTailUser = async (req, res) => {

    const { limit, from } = req.query;

    const query = {$or:[{ role: 'tailUser', status: 'active' }, { role: 'tailHouse', status: 'active' }]};

    const [total, tailUser] = await Promise.all([
        TailUser.countDocuments(query),
        TailUser.find(query).skip(Number(from)).limit(Number(limit)),
      ]);
    
    res.status(200).json({
        msg: `The ${total} tailUsers and tailHouses are:`,
        tailUser
    });

}

export const getAllTailUserRoleFilter = async (req, res) => {

    const { limit, from } = req.query;

    const { role } = req.params;

    const query = { role: role };

    const [total, tailUser] = await Promise.all([
        TailUser.countDocuments(query),
        TailUser.find(query).skip(Number(from)).limit(Number(limit)),
      ]);
    
    res.status(200).json({
        msg: `The ${total} ${role} are:`,
        tailUser
    });

}