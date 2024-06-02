const { getUser } = require("../services/auth")


const userAuthorization = async (req, res, next) => {
    const userUID = req.cookies?.uID

    if (!userUID) return res.redirect("/login")

    const user = getUser(userUID)

    if (!user) return res.redirect("/login")

    req.user = user
    next()
}

const checkAuth = async (req, res, next) => {
    const userUID = req.cookies?.uID
    const user = getUser(userUID)
    req.user = user
    next()
}


module.exports = {userAuthorization, checkAuth}