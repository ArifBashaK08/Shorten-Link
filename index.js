import express from "express"
import mongoDBSetUp from "./mongoSetUp.js"
import path from "path"
import cookieParser from 'cookie-parser';
import { authenticateUser, authorizeUser } from "./middleware/auth.js"

import staticRoute from "./routes/staticRoute.js"
import routerAPI from "./routes/api/users.js"
import urlRouter from "./routes/url.js"
import userRouter from "./routes/users.js"

const port = 5000
const app = express()
const DBUrl = "mongodb://127.0.0.1:27017/local"

//Setting view engine as ejs
app.set("view engine", "ejs")

//Providing path of ejs files to access
app.set("views", path.resolve("./views"))

app.use(express.json())
//To parse the data of forms into JSON
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Establishing connection with MongoDB
mongoDBSetUp(DBUrl)

//====== CRUD operations on User data ======//
app.use("/api/users", routerAPI)

//====== Authentication ======//
app.use("/user", userRouter)
app.use(authenticateUser)
app.get("/signup", staticRoute)
app.get("/signin", staticRoute)

//====== Shorten-Link ======//
app.use("/url", authorizeUser(["user"]), urlRouter)
app.get("/", staticRoute)


app.listen(port, () => console.log(`Server is running on port : ${port}`))