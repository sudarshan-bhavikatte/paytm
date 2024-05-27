import userRouter from "./user.js"
import express from "express"

const mainRouter = express.Router()

mainRouter.use('/user', ...userRouter)

export default mainRouter
