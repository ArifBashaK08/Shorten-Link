import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        require: true,
        unique: true
    },
    redirectedURL: {
        type: String,
        require: true,
    },
    history: [{ timeStamp: { type: String } }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }, 
},
    { timeStamp: true },
    { collections: "urls" },
)

export const URL = mongoose.model("urls", urlSchema)