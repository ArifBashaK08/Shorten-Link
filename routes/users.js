import express from "express"
import { signupHandler, logInHandler} from "../controllers/users.js"

const userRouter = express.Router()

userRouter.post("/", signupHandler)
userRouter.post("/signin", logInHandler)

export default userRouter