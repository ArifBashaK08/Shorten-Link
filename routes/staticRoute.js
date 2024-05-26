import express from "express"
import { getAllURLs } from "../controllers/url.js"

const staticRoute = express.Router()

staticRoute.get("/", getAllURLs)

staticRoute.get("/signup", (req, res) => {
    return res.status(200).render("signUp")
})

staticRoute.get("/signin", (req, res) => {
    return res.status(200).render("signIn")
})

export default staticRoute