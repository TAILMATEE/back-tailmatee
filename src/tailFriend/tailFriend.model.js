import {Schema, model} from 'mongoose'

const TailFriendSchema = Schema({
    tailOwner:{
        type: Schema.Types.ObjectId,
    },
    name:{
        type: String,
        required: [true, 'Name is required']
    },
    username:{
        type: String
    },
    birthdate:{
        type: Date,
    },
    age:{
        type: Number,
        default: 0
    },
    category:{
        type: String,
        required: [true, 'Category is required']
    },
    specie:{
        type:String,
        required: [true, 'Specie is required']
    },
    race:{
        type: String,
        required: [true, 'Race is required']
    },
    gender:{
        type: String,
        enum:['MALE','FEMALE'],
        required:[true,'Gender is required']
    },
    imgProfile:{
        type: String,
        default: ''
    },
    description:{
        type: String,
        required: [true, 'Description is required']
    },
    status:{
        type: String,
        enum:['ADOPTED','FOR-ADOPTION','LOST','DEAD'],
    }
})

TailFriendSchema.methods.toJSON = function(){
    const {__v, _id, ...tailFriend} = this.toObject()
    tailFriend.id = _id;
    return tailFriend;
}

export default model('TailFriend', TailFriendSchema);