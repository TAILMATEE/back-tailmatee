import { Schema, model } from 'mongoose'

const AdoptionSchema = Schema({
    tailUser:{
        type: Schema.Types.ObjectId,
    },
    occupation: {
        type: String,
        required: [true, 'Occupation is required'],
    },
    civilStatus: {
        type: String,
        enum: ['MARRIED','SINGLE','DIVORCED','WIDOWER'],
        required: [true, 'Civil status is required'],
    },
    whyAdopt: {
        type: String,
        required: [true, 'Why adopt is required'],
    },
    hasPet: {
        type: Boolean,
        required: [true, 'Has pet is required'],
    },
    howManyPet: {
        type: Number,
    },
    previouslyHasPet: {
        type: Boolean,
        required: [true, 'Previously has pet is required'],
    },
    whatHappen: {
        type: String,
    },
    howManyPeople: {
        type: Number,
        required: [true, 'How many people is required'],
    },
    areThereChildren: {
        type: Boolean,
        required: [true, 'Are there children is required'],
    },
    howManyChildren: {
        type: Number,
    },
    rentHouse: {
        type: Boolean,
        required: [true, 'Rent house is required'],
    },
    allowPet: {
        type: Boolean,
        required: [true, 'Allow pet is required'],
    },
    financialCapacity: {
        type: Boolean,
        required: [true, 'Financial capacity is required'],
    },
    economicRange: {
        type: String,
        required: [true, 'Economic range is required'],
    },
    adoptionStatus: {
        type: String,
        default: 'PENDING',
        enum: ['PENDING','REJECTED','APPROVED'],
    },
    usernameTailFriend:{
        type: String,
        required: [true, 'Username Tail Friend is required'],
    },
})

AdoptionSchema.methods.toJSON = function(){
    const { __v, _id, ...data } = this.toObject()
    data.id = _id
    return data
}

export default model('Adoption', AdoptionSchema);