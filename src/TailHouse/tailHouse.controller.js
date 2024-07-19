'use strict';

import TailHouse from './tailHouse.model.js';

export const putTailHouse = async (req, res) => {
    try {
        const { idTailHouse } = req.params;
        const { __v, _id, status,tailUsers,tailFriends, verify, ...tailHouseData } = req.body;
        
        await TailHouse.findByIdAndUpdate(
            idTailHouse,
            tailHouseData
        )

        res.status(200).json({
            message: 'TailHouse updated'
        });
    } catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

export const getTailHouseById = async (req, res) => {
    
    try {
        const { idTailHouse } = req.params;
        const tailHouse = await TailHouse.findOne({_id:idTailHouse});

        res.status(200).json({
            tailHouse
        });
    } catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}   

export const getTailHouses = async (req, res) => {
    try {
        let { status } = req.body;
        if ( !status) {
            status = 'active'
        }else if(status.split(' ').join('') == ''){
            status = 'active'
        }
        const { limit, from } = req.query;
        const [totalTailHouse, tailHouse] = await Promise.all([
            TailHouse.countDocuments({ status: status }),
            TailHouse.find({status:status}).skip(Number(from)).limit(Number(limit))
        ]);

        res.status(200).json({
            totalTailHouse,
            tailHouse
        });
    } catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}