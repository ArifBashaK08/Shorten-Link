const URL = require("../models/url")
const express = require("express")

const router = express.Router()

router.get("/", async (req, res) => {
    if(!req.user) return res.redirect("/login")
    const allUrls = await URL.find({createdBy: req.user._id})
    return res.status(200).render("index", {urls: allUrls})
})

router.get("/signup", (req, res)=>{
    return res.render("signUp")
})
router.get("/login", (req, res)=>{
    return res.render("logIn")
})
module.exports = router