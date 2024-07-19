import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    dateAndTime: {

        type: Date,
        required: true,
        default: Date.now

    },

    text: {

        type: String,
        required: true,
        default: ''

    },

    img: {

        type: String,

    },

    likes: {

        type: Number,
        default: 0

    },

    idLikes: {

        type: [String],
        default: [""]

    },

    comentaries: {

        type: Number,
        default: 0

    },

    idCommentaries: {

        type: [String],
        default: [""]

    },

    tailCreator: {

        type: String,
        required: true

    },
    
    tailFriend: {

        type: String,
        required: true

    },

    status: {

        type: Boolean,
        default: true

    }

});

export default mongoose.model("Post", postSchema)