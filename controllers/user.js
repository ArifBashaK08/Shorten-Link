const user = require("../models/users")
const { v4: uuidV4 } = require("uuid")
const {setUser, getUser} = require("../services/auth")

const signUpHandler = async (req, res) => {
    const { name, email, password } = req.body
    try {
        await user.create({
            name, email, password
        }).then(() => console.log(`User with ${email} has created`))
        return res.render("index")
    } catch (error) {
        console.error("Error during Signing up :", error);
        res.status(500).send("Internal Server Error");
    }
}

const logInHandler = async (req, res) => {
    const { email, password } = req.body
    try {
        const result = await user.findOne({
            email, password
        })
        if (result) {
            const sessionID = uuidV4()
            setUser(sessionID, result)
            res.cookie("uID", sessionID)
            return res.redirect("/")
        } else {
            console.log("User not found. Please, sign-up first")
            return res.redirect("/signup")
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = {
    signUpHandler,
    logInHandler
}