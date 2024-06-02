const mongoose = require("mongoose")

const connectToMongo = async (url) => {
    await mongoose.connect(url)
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.error("MongoDB refused to connect\n", err))
}

module.exports = { connectToMongo }