import { Schema, model } from 'mongoose'

const TailHouseSchema = Schema({
    nameTailHouse: {
        type: String,
        required: [true, 'Name TailHouse is required'],
    },
    nameManager:{
        type: String,
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
    },
    email: {
        type: String,
    },
    description: {
        type: String,
    },
    imgProfile: {
        type: String,
    },
    imgBanner: {
        type: String,
    },
    verify: {
        type: String,
        enum: ['verified', 'unverified'],
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
})

TailHouseSchema.methods.toJSON=function(){
    const {__v, _id, ...tailHouse}=this.toObject()
    tailHouse.id=_id
    return tailHouse
}

export default model('TailHouse', TailHouseSchema)