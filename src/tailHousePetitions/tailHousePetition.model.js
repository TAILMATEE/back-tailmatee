import { Schema, model } from 'mongoose'

const TailHousePetitionSchema = Schema({
    dateAndTime: {
        type: Date,
        default: Date.now,
    },
    nameManager: {
        type: String,
        required: [true, 'Name Manager is required'],
    },
    dpiPhotoManager: {
        type: Array,
        required: [true, 'DpiPhotoManager is required'],
    },
    placePhotos: {
        type: Array,
        required: [true, 'Place Photos is required'],
    },
    petitionStatus: {
        type: String,
        enum: ['denied', 'in-progress', 'approved'],
        default: 'in-progress',
    },
    placeIsYours: {
        type: String,
        required: [true, 'Place Is Yours is required'],
    },
    attachEvidence: {
        type: Array,
        required: [true, 'Attach Evidence is required'],
    },
    receiveVisit: {
        type: Boolean,
        required: [true, 'Receive Visit is required'],
    },
    disponibility: {
        type: String,
    },
    tailHouse:{
        type: Schema.Types.ObjectId,
    },
    tailUser:{
        type: Schema.Types.ObjectId,
    },
})

TailHousePetitionSchema.methods.toJSON=function(){
    const {__v, _id, ...tailHouse}=this.toObject()
    tailHouse.id=_id
    return tailHouse
}

export default model('TailHousePetition', TailHousePetitionSchema)