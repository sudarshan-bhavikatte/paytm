import z from "zod"
import express from "express"

const signinValidation = z.object({
    name : z.string(),
    password : z.string()
})

export default signinValidation