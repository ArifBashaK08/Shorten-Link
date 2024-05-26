import { getUser } from "../services/auth.js"

export const authunticateUser = async (req, res, next) => {
    const userID = req.cookies?.uID

    if (!userID) return res.status(401).redirect("/signin")

    const user = getUser(userID)

    if (!user) return res.status(401).redirect("/signin")

    req.user = user

    next()
}
