'use strict';

import {
    obtainExtensionFiles,
    calculatedAge
} from '../helpers/help-functions.js';
import TailFriend from './tailFriend.model.js';
import { uploadImageToImgBB } from '../helpers/upload-image.js';

export const postTailFriend = async (req, res) => {
    const { _id, username } = req.tailUser;

    const {
        name,
        birthdate,
        category,
        specie,
        race,
        gender,
        description,
        status
    } = req.body;

    let usernameTailFriend = `${username}/${name}`;
    const birthDate = new Date(birthdate);

    const tailFriend = new TailFriend({
        tailOwner: _id,
        name,
        username: usernameTailFriend,
        birthdate,
        category,
        specie,
        race,
        gender,
        imgProfile: '',
        description,
        status
    });
    tailFriend.age = calculatedAge(birthDate);

    if (req.files) {
        const img = req.files.imgProfile;
        const imgUrl = await uploadImageToImgBB(img);
        tailFriend.imgProfile = imgUrl;
    }

    //await tailFriend.save();
    res.status(200).json({
        msg: "TailFriend Created",
    })
}

export const putTailFriend = async (req, res) => {
    const {__v,_id, username,...tailFriendData } = req.body;
    const usernameLogged= req.tailUser.username;
    const tailFriend = await TailFriend.findOne({username:`${usernameLogged}/${tailFriendData.usernameTailFriend}`});
     
}
