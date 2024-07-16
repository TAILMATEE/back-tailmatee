'use strict';

import {
    obtainExtensionFiles,
    calculatedAge
} from '../helpers/help-functions.js';
import TailFriend from './tailFriend.model.js';
import { uploadImageToImgBB } from '../helpers/upload-image.js';

export const postTailFriend = async (req, res) => {
    let img;
    if (req.files) {
        const { imgProfile } = req.files;
        img = imgProfile;
    }
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
    })
    tailFriend.age = calculatedAge(birthDate);

    if (img) {
        const imgUrl = await uploadImageToImgBB(img);
        tailFriend.imgProfile = imgUrl;
    }

    await tailFriend.save();

    res.status(200).json({
        msg: "TailFriend Created",
    })
}