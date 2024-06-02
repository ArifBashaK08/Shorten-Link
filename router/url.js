const express = require("express")
const {generateShortURLHandler, redirectHandler,  getAnalyticsHandler} = require("../controllers/url")
const router = express.Router()

router.post("/", generateShortURLHandler)
router.get("/:shortID", redirectHandler)
router.get("/analytics/:shortID", getAnalyticsHandler)


module.exports = router;