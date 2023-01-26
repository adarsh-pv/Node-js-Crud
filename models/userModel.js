import mongoose  from "mongoose";
import { Schema } from "mongoose";
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    number:Number,
    password:String
})
const userModel = mongoose.model('users',userSchema)

export default userModel;