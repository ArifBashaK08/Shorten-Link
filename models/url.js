const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        required: true,
        unique: true,
    },
    redirectedURL: {
        type: String,
        required: true,
    },
    history: [{ timeStamp: { type: String } }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
},
    { timeStamp: true },
    { collection: 'urls' }
)

const URL = mongoose.model("url", urlSchema)

module.exports = URL;