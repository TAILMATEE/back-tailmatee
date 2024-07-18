import { withoutTime } from "../../configs/defaultCredentials.js";
import { Denoucement } from "./denoucement.model.js";

import { parse, format } from 'date-fns';

import Denoucement from "./denoucement.model.js";

export { withoutTime } from '../../configs/defaultCredentials.js';

export const dateWithTime = (date) => {

    const parseDate = parse(date, 'MM-dd-yyyy HH:mm:ss', new Date());

    const formattedDate = format(parseDate, 'MM/dd/yyyy/ss/mm/HH');

    return formattedDate;

}

export const createDenoucement = async (req, res) => {

    const { dateAndTime, typeOfPet, typeOfAbuse, description } = req.body;

    const date = withoutTime(dateAndTime);

    const newDenoucement = new Denoucement({ 
        tailUser: req.tailUser.username,
        dateAndTime: date, 
        typeOfPet, 
        typeOfAbuse, 
        description,
        status: 'in-progress' 
    });

    await newDenoucement.save();

    res.status(200).json({

        msg: 'Denoucement created',

        newDenoucement

    })

}

const acceptDenoucement = async (req, res) => {

    const { _id } = req.params;

    await Denoucement.findOneAndUpdate({ _id }, { status: 'done' });

    const findDenoucement = await Denoucement.findOne({ _id });

    res.status(200).json({ msg: `${findDenoucement.tailUser} your denoucement was accepted` })

}

const denyDenoucement = async (req, res) => {

    const { _id } = req.params;

    await Denoucement.findOneAndUpdate({ _id }, { status: 'fake' });

    const findDenoucement = await Denoucement.findOne({ _id });

    res.status(200).json({ msg: `${findDenoucement.tailUser} your denoucement was deny` })

}

const getPendingDenoucement = async (req, res) => {

    const { limit, from } = req.query;

    const query = { status: 'in-progress' };

    const [total, denoucement] = await Promise.all([

        Denoucement.countDocuments(query),
        Denoucement.find(query).skip(Number(from)).limit(Number(limit))

    ]);

    res.status(200).json({ msg: `The ${total} pending denoucements are:`, denoucement });


}