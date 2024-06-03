import express from "express"
import { getAllURLs, getURLs } from "../controllers/url.js"
import { authorizeUser } from "../middleware/auth.js"

const staticRoute = express.Router()

staticRoute.get("/admin/urls", authorizeUser(["admin"]), getAllURLs)

staticRoute.get("/", authorizeUser(["user", "admin"]), getURLs)

staticRoute.get("/signup", (req, res) => {
    return res.status(200).render("signUp")
})

staticRoute.get("/signin", (req, res) => {
    return res.status(200).render("signIn")
})

export default staticRoute