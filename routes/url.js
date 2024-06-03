import express from "express"
import { generateShortURL, redirectToURL, getURLAnalytics } from "../controllers/url.js"

const urlRouter = express.Router()

urlRouter.post("/", generateShortURL)
urlRouter.get("/:shortID", redirectToURL)
urlRouter.get("/analytics/:shortID", getURLAnalytics)


export default urlRouter