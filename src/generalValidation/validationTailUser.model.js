import mongoose from "mongoose";

const validationTailUserSchema = new mongoose.Schema({

    gender: {

        type: String,
        enum: ['male', 'female']

    },

    role: {

        type: String,
        enum: ['tailUser', 'tailAdmin']

    },

    typeAccount: {

        type: String,
        enum: ["private", "public"]

    },

    status: {

        type: String,
        enum: ["active", "inactive", "blocked"]

    }

});

export default mongoose.model('validationTailUser', validationTailUserSchema)