
import TailFriend from "../tailFriend/tailFriend.model.js";
import Adoption from "./adoption.model.js"
import AdoptionPetition from "./adoptionPetition.model.js"

export const postAdoption = async (req, res) => {
    const {
        occupation,
        civilStatus,
        whyAdopt,
        hasPet,
        howManyPet,
        previouslyHasPet,
        whatHappen,
        howManyPeople,
        areThereChildren,
        howManyChildren,
        rentHouse,
        allowPet,
        financialCapacity,
        economicRange,
        adoptionStatus,
        usernameTailFriend
    } = req.body
    const { _id } = req.tailUser;

    const adoptionPetition = new AdoptionPetition({
        tailUser: _id,
        occupation,
        civilStatus,
        whyAdopt,
        hasPet,
        howManyPet,
        previouslyHasPet,
        whatHappen,
        howManyPeople,
        areThereChildren,
        howManyChildren,
        rentHouse,
        allowPet,
        financialCapacity,
        economicRange,
        adoptionStatus,
        usernameTailFriend
    })

    await adoptionPetition.save();

    res.status(201).json({
        msg:"Petition of adoption created, wait for the response of the admin",
    })

}

export const getAdoptionPetitions = async (req, res) => {
    const adoptionPetitions = await AdoptionPetition.find({adoptionStatus:'PENDING'});
    res.status(200).json(adoptionPetitions);
}

export const acceptAdoptionPetition = async (req, res) => {
    const {idAdoptionPeition} = req.body;
    const adoptionPetition = await Adoption.findById(idAdoptionPeition);
    const userPetition = await User.findById(adoptionPetition.tailUser);
    const tailFriend = await TailFriend.findOne({username:adoptionPetition.usernameTailFriend});
    
}