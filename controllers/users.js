import { userModel } from "../models/userModel.js"
import { v4 as uuidV4 } from "uuid"
import { setUser } from "../services/auth.js"

export const signupHandler = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const userExists = await userModel.findOne({ email })

        if (userExists) return res.status(409).send(`<h1>User already exists. Please, sign in</h1>`)

        await userModel.create({
            name,
            email,
            password,
        })
        return res.status(200).redirect("/")
    } catch (error) {
        console.error("Error : ", error.message)
        res.status(500).send(`<h1>Inertnal server Error - 500 - Check logs</h1>`)
    }
}

export const logInHandler = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (!user) return res.status(404).send(`
        <h1>User not found. Please, sign up</h1>
        <script>
        setTimeout(()=> {
            window.location.href = "/signup"
        }, 1000)
        </script>`)
        if (password !== user.password) return res.status(400).send(`
        <h1>Invalid Credentials</h1>
        <script>
        setTimeout(()=> {
            window.location.href = "/signin"
        }, 1000)
        </script>`)

        //For state-full Authentication
        // const sessionID = uuidV4()
        // setUser(sessionID, user)

        const token = setUser(user)

        // res.cookie("uID", sessionID)//For state-full Authentication

        res.cookie("uID", token)
        return res.status(200).redirect("/")
    } catch (error) {
        console.error("Error : ", error.message)
        res.status(500).send(`<h1>Inertnal server Error - 500 - Check logs</h1>`)
    }
}