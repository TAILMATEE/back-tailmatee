import mongoose, { model } from "mongoose";

const validationDenoucementSchema = new mongoose.Schema({

    status: {

        type: String,
        enum: ["in-progress", "done", "fake"]

    }

});

export default mongoose.model("ValidationDenoucement", validationDenoucementSchema)