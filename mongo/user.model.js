
import mongoose from "mongoose";
// import { email, string } from "zod";
// import { required } from "zod/mini";



 const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],

    },

    email:{
     type:String,

    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false // Don't return password by default in queries
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

})

export const User =  mongoose.model('User',UserSchema)

