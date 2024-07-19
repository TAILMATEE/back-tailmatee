import { parse, format } from 'date-fns';

import Denoucement from "./denoucement.model.js";

export const dateWithTime = (date) => {

    const parseDate = parse(date, 'MM/dd/yyyy HH:mm:ss', new Date());

    const formattedDate = format(parseDate, 'MM/dd/yyyy ss:mm:HH');

    return formattedDate;

}

export const createDenoucement = async (req, res) => {

    const { dateAndTime, typeOfPet, typeOfAbuse, description } = req.body;

    const date = dateWithTime(dateAndTime);

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

export const acceptDenoucement = async (req, res) => {

    const { _id } = req.params;

    console.log(_id);

    const findDenoucement = await Denoucement.findOneAndUpdate({ _id }, { status: 'done' });

    res.status(200).json({ msg: `The denoucement of the tailUser ${findDenoucement.username}; was accepted` })

}

export const denyDenoucement = async (req, res) => {

    const { _id } = req.params;

    const findDenoucement = await Denoucement.findOneAndUpdate({ _id }, { status: 'fake' });

    res.status(200).json({ msg: `The denoucement of the tailUser ${findDenoucement.username}; was deny` })

}

export const getPendingDenoucement = async (req, res) => {

    const { limit, from } = req.query;

    const query = { status: 'in-progress' };

    const [total, denoucement] = await Promise.all([

        Denoucement.countDocuments(query),
        Denoucement.find(query).skip(Number(from)).limit(Number(limit))

    ]);

    res.status(200).json({ msg: `The ${total} pending denoucements are:`, denoucement });


}