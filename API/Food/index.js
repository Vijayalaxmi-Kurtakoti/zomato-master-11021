import express from "express";

import {FoodModel} from "../../database/allModels";

const Router=express.Router();

/*
Route       /
Des         Get all the foods on particular restaurant
Params      _id
Access      Public
Method      GET
*/

Router.get("/:_id",async(req,res)=>{
    try{
        const{_id}=req.params;
        const foods=await FoodModel.find({restaurant:_id});
        return res.json({foods});
    } catch (error){
        return res.status(500).json({error:error.message});

    }
});


/*
Route       /r
Des         Get all the foods on particular category
Params      category
Access      Public
Method      GET
*/

Router.get("/r/:category",async(req,res)=>{
    try{
        const{category}=req.params;
        const foods=await FoodModel.find({
            //i-->case insensitive
            //regex-->if its gobi manchurian and u type gobi or manchuri it will show the results
        category:{$regex:category, $options:"i"}
        });
        return res.json({foods});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
});

export default Router;