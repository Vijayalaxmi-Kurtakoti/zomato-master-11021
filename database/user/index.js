import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    fullname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:string},
    address:[{detail:{type:string},for:{type:string}}],
    phoneNumber:[{type:Number}]
});

export const UserModel=mongoose.model("Users",UserSchema);