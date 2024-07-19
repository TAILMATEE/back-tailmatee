import mongoose from "mongoose";

const denoucementSchema = new mongoose.Schema({

    tailUser: {

        type: String,
        required: true

    },

    dateAndTime: {

        type: Date,
        required: true

    },

    typeOfPet: {

        type: String,
        required: true

    },

    typeOfAbuse: {

        type: String,
        required: true

    },

    description: {

        type: String,
        required: true

    },

    status: {

        type: String,
        required: true,
        enum: ["in-progress", "done", "fake"]

    }

});


export default mongoose.model('Denoucement', denoucementSchema)