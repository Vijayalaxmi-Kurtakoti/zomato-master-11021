import express from "express";
import bcrypt from "bcryptjs";

//Models
import{UserModel} from "../../database/user";

const Router=express.Router();

/*
Route       /signup
Des         Signup using email and password
Params      None
Access      Public
Method      POST
*/

Router.post("/signup",async(req,res)=>{
    try{
        const{email,password,fullname,phoneNumber}=req.body.credentials;

        const checkUserByEmail=await UserModel.findOne({email});
        const checkUserByPhone=await UserModel.findOne({phoneNumber});

        if(checkUserByEmail || checkUserByPhone){
            return res.json({error:"User already Exists!!!!!"});
        }
    //hashing ur password
        const bcryptSalt=await bcrypr.genSalt(8);
        const hashedPassword=await bcrypt.hash(password,bcryptSalt);
     
    //save to DB
    await UserModel.create({
        ...req.body.credentials,
        password:hashedPassword
    });
    //JWT Token
    const token = jwt.sign({user:{fullname,email}},"ZomatoApp");
    

    return res.status(200).json({token,status:"success"});
    //create new cluster/project in MongoDB like taskmanagement to test API
    }catch(error){
     return res.status(500).json({error:console.error(message)});

    }
});
