import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({

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

    like: {

        type: Number,
        default: 0

    },

    idPost: {

        type: Number,
        required: true

    },

    status: {

        type: Boolean,
        default: true

    }



});

export default mongoose.model("Comment", commentSchema)