import { Schema, model } from 'mongoose'

const TailHouseSchema = Schema({
    nameTailHouse: {
        type: String,
        default: '',
    },
    nameManager:{
        type: String,
        default: '',
    },
    address: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default:'',
    },
    imgProfile: {
        type: String,
        default: '',
    },
    imgBanner: {
        type: String,
        default:'',
    },
    verify: {
        type: String,
        enum: ['verified', 'unverified'],
        default: 'unverified',
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    tailUsers:{
        type: [Schema.Types.ObjectId],
        ref: 'TailUser',
    },
    tailFriends:{
        type: [Schema.Types.ObjectId],
        ref: 'TailFriend',
    },
})

TailHouseSchema.methods.toJSON=function(){
    const {__v, _id, ...tailHouse}=this.toObject()
    tailHouse.id=_id
    return tailHouse
}

export default model('TailHouse', TailHouseSchema)