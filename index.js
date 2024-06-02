const express = require("express")
const urlRoute = require("./router/url")
const staticRoute = require("./router/staticRoute")
const { connectToMongo } = require("./mongoConnection")
const URL = require("./models/url")
const path = require("path")
const userRoute = require("./router/user")
const cookieParser = require("cookie-parser")
const { userAuthorization, checkAuth } = require("./middlewares/auth")

const app = express()
const port = 1000

connectToMongo("mongodb://127.0.0.1:27017/local")
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Middleware to logIn
app.use("/url", userAuthorization, urlRoute)
app.use("/user", userRoute)
// for homepage
app.get("/", checkAuth, staticRoute)
// for signup page
app.get("/signup", staticRoute)
// for Login page
app.get("/login", staticRoute)

app.listen(port, () => console.log(`Server is running on port: ${port}`))