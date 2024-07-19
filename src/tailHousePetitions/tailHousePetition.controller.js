'use strict';

import { uploadImageToImgBB } from '../helpers/upload-image.js'
import TailHousePetition from './tailHousePetition.model.js';
import TailUser from '../tailUser/tailUser.model.js';
import TailHouse from '../TailHouse/tailHouse.model.js';

export const postTailHousePetition = async (req, res) => {
    const { _id } = req.tailUser;

    const { nameManager,
        dpiPhotoManager,
        placePhotos,
        placeIsYours,
        receiveVisit,
        disponibility } = req.body;

    const newTailHousePetition = new TailHousePetition({
        tailUser: _id,
        nameManager,
        dpiPhotoManager,
        placePhotos,
        placeIsYours,
        receiveVisit
    });

    try {
        if (receiveVisit == 'true') {
            if (!disponibility || disponibility.split(' ').join('') == '') {
                return res.status(400).json({ msg: 'Disponibility is required' })
            } else {
                newTailHousePetition.disponibility = disponibility
            }
        }

        if (Array.isArray(req.files.dpiPhotoManager)) {
            for (let imageDpi of req.files.dpiPhotoManager) {
                let urlImageDPI = await uploadImageToImgBB(imageDpi);
                newTailHousePetition.dpiPhotoManager.push(urlImageDPI);
            }
        } else {
            let urlImageDPI = await uploadImageToImgBB(req.files.dpiPhotoManager);
            newTailHousePetition.dpiPhotoManager.push(urlImageDPI);
        }

        if (Array.isArray(req.files.placePhotos)) {
            for (let imagePlace of req.files.placePhotos) {
                let urlImagePlace = await uploadImageToImgBB(imagePlace);
                newTailHousePetition.placePhotos.push(urlImagePlace);
            }
        } else {
            let urlImagePlace = await uploadImageToImgBB(req.files.placePhotos);
            newTailHousePetition.placePhotos.push(urlImagePlace);
        }

        if (placeIsYours == 'true') {
            if (Array.isArray(req.files.attachEvidence)) {
                for (let imageEvidence of req.files.attachEvidence) {
                    let urlImageEvidence = await uploadImageToImgBB(imageEvidence);
                    newTailHousePetition.attachEvidence.push(urlImageEvidence);
                }
            } else {
                let urlImageEvidence = await uploadImageToImgBB(req.files.attachEvidence);
                newTailHousePetition.attachEvidence.push(urlImageEvidence);
            }
        }
        await newTailHousePetition.save();
        res.status(201).json({
            msg: 'Petition created successfully',
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getTailHousePetitions = async (req, res) => {
    try {
        let { status } = req.body;
        if ( !status) {
            status = 'in-progress'
        }else if(status.split(' ').join('') == ''){
            status = 'in-progress'
        }
        const { limit, from } = req.query;
        const [totalTailHousePetitions, tailHousePetitions] = await Promise.all([
            TailHousePetition.countDocuments({ petitionStatus: status }),
            TailHousePetition.find({petitionStatus:status}).skip(Number(from)).limit(Number(limit))
        ]);
        res.status(200).json({
            totalTailHousePetitions,
            tailHousePetitions
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getTailHousePetition = async (req, res) => {
    const { id } = req.params;
    try {
        const tailHousePetition = await TailHousePetition.findById(id);
        if (!tailHousePetition) {
            return res.status(404).json({ msg: 'TailHousePetition not found' });
        }
        res.status(200).json(tailHousePetition);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const acceptTailHousePetitions = async (req, res) => {
    const {idTailHousePetition} = req.body;
    const tailHousePetition = await TailHousePetition.findById(idTailHousePetition);
    const userHousePetition = await TailUser.findOne({_id:tailHousePetition.tailUser});
    
    const newTailHouse = new TailHouse({
        nameManager:tailHousePetition.nameManager,
        verify:'verified',
        tailUsers:[userHousePetition._id],
    });
    await TailHousePetition.findByIdAndUpdate(idTailHousePetition,{petitionStatus:'accepted',tailHouse:newTailHouse._id});

    newTailHouse.save();

    res.status(200).json({
        msg: `Petition accepted successfully and TailHouse created successfully The ID Tail House is: ${newTailHouse.id}`,
    });
}