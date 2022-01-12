import mongoose from "mongoose";

const FoodSchema=new mongoose.Schema({
    name:{type:String,required:true},
    descript:{typr:String,required:true},
    isVeg:{type:Boolean,required:true},
    isContainEgg:{type:Boolean,required:true},
    category:{type:String,required:true},
    photos:{
        type:mongoose.Types.ObjectId,
        ref:"Images"
    },
    price:{type:Number,default:150,required:true},
    addOns:[
        {
            type: mongoose.Types.ObjectId,
            ref:"Foods"
        }
    ],
    restaurant:{
        type:mongoose.Types.ObjectId,
        ref:"Restaurants",
        required:true
    }
},
{
    timestams:true
});

export const FoodModel=mongoose.model("Foods",FoodSchema);