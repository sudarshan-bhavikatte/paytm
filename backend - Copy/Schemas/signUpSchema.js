import mongoose from "mongoose";


const signUpSchema = new mongoose.Schema({
    name: {
        type : String
    },
    password: String,
});


export default signUpSchema;