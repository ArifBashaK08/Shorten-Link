import mongoose from "mongoose";

const mongoDBSetUp = (url) => {
    mongoose.connect(url)
        .then(() => console.log("Server connected to MongoDB"))
        .catch((err) => console.error("MongoDB refused to connect\n", err))
}

export default mongoDBSetUp