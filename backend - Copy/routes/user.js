
import express from 'express'
import URL from "../DB.js";
import mongoose from "mongoose";
import signUpSchema from "../Schemas/SignUpSchema.js";
import signinMiddleware from './validation/signinMiddleware.js';

const signup = express.Router()
const signin = express.Router()
const update = express.Router()
signin.use(express.json())
mongoose.connect(URL)
const signUpUser = mongoose.model("signUpuser", signUpSchema)

signup.post('/signup', async (req, res) => {
    const user = await signUpUser.findOne({ name: req.body.name })
    if(user){
        res.send("user already exists")
    }
    else{
        const newUser = new signUpUser.create({
            name : req.body.name,
            password : req.body.password
        })
        newUser.save()
        res.send("new user created")
    }
})

signin.post('/signin',signinMiddleware, async (req, res) => {
    const name = req.body.name
    const password = req.body.password

    try{
        const user =  await signUpUser.findOne({name : name})

        res.json({
            msg : `wlecome ${user.name}`
        })
    }
    catch{
        res.json({
            msg: "user not found"
        })
    }
})

update.put('/update/:userName/:userPassword', async (req, res) => {
    const { userName, userPassword } = req.params
    const user = await signUpUser.findOne({ name: userName })
    if (!user) {
        res.send(`user not found`)
    }
    else {
        if (userPassword != user.password) {
            res.send(`${user.name}! ur password is worng`)
        }
        else {
            const updatedUser = {
                name: req.body.newName,
                password: req.body.newPassword
            }
            await signUpUser.updateOne(user, updatedUser)
            res.send("user name and password updated")
        }

    }
})

const userRouter = [signin, signup, update]

export default userRouter