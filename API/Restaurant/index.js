import express from "express";

import {RestaurantModel} from "../../database/allModels";
import {ValidateRestaurantCity,ValidateRestaurantSearchString } from "../../Validation/restaurant";
import {ValidateRestaurantId} from "../../Validation/food";
const Router=express.Router();

/*
Route       /
Des         Get all the restaurant details
Params      None
Access      Public
Method      GET
*/

Router.get("/",async(req,res)=>{
    try{
        await ValidateRestaurantCity(req.query);
        const{city}=req.query;
        const restaurants=await RestaurantModel.find({city});
        return res.json({restaurants});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
});

/*
Route       /
Des         Get a particular restaurant details based on id
Params      _id
Access      Public
Method      GET
*/

Router.get("/:_id",async(req,res)=>{
    try{
        await ValidateRestaurantId(req.params);
        const{_id}=req.params;
        const restaurants=await RestaurantModel.find({_id});
        return res.json({restaurants});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
});

/*
Route       /Search
Des         Get a particular restaurant details based on id
Params      SearchString
Access      Public
Method      GET
*/

Router.get("/search",async(req,res)=>{
    try{
        await ValidateRestaurantSearchString(req.body);
        const{searchString}=req.body;
        const restaurants=await RestaurantModel.find({
            name:{$regex:searchString,$options:"i"}
        });
        return res.json({restaurants});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
});
 

export default Router;
