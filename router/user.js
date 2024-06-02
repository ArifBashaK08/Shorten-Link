const express = require("express")
const {signUpHandler, logInHandler} = require("../controllers/user")

const router = express.Router()

router.post("/", signUpHandler)
router.post("/login", logInHandler)


module.exports = router