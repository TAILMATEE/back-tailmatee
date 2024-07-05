import mongoose from "mongoose";

const tailUserSchema = new mongoose.Schema({

    name: {

        type: String,
        required: true

    },

    lastname: {

        type: String,
        required: true

    },

    username: {

        type: String,
        required: true,
        unique: true

    },

    birthdate: {

        type: Date,
        required: true

    },

    age: {

        type: Number,
        required: true

    },

    gender: {

        type: String,
        required: true,
        enum: ["male", "female"]

    },

    email: {

        type: String,
        required: true,
        unique: true

    },

    password: {

        type: String,
        required: true

    },

    imgProfile: {

        type: String

    },

    role: {

        type: String,
        required: true,
        enum: ["tailAdmin", "tailUser"],
        default: "tailUser"

    },

    phone: {

        type: String,
        required: true

    },

    typeAccount: {

        type: String,
        required: true,
        enum: ["private", "public"],
        default: "public"

    },

    status: {

        type: String,
        required: true,
        enum: ["active", "inactive", "blocked"],
        default: "active"

    }

});

export default mongoose.model('TailUser', tailUserSchema)