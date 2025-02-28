const express=require("express");
const catchAsyncError = require("../Middleware/catchAsyncError");
const ErrorHandler = require("../Utils/ErrorHandler");
const unitModel = require("../Models/unitModel");

const router=express.Router();

router.post("/add-unit",catchAsyncError(async(req,res,next)=>{
    try {
        const {unit}=req.body;
        const newUnit={unit};
        const addUnit=await unitModel.create(newUnit);

        if(!addUnit){
            return res.status(404).json({message:"Unit not found!.."})
        }
        res.status(201).json({message:"unit created!..",addUnit})
    } catch (error) {
        return next(new ErrorHandler(error.message,404))
    }
}))

router.get("/get-unit",catchAsyncError(async(req,res,next)=>{
    try {
        const getUnits=await unitModel.find();
        res.status(200).json(getUnits)
    } catch (error) {
       return next(new ErrorHandler(error.message,404)) 
    }
}))

router.delete("/delete-unit/:id",catchAsyncError(async(req,res,next)=>{
    try {
        const {id}=req.params;
        const deleteUnit=await unitModel.findOneAndDelete({_id:id});
        res.status(200).json({message:"unit deleted!.."})
    } catch (error) {
        return next(new ErrorHandler(error.message,404))
    }
}))

router.patch("/edit-unit/:id",catchAsyncError(async(req,res,next)=>{
    try {
        const{id}=req.params;
        const{unit}=req.body;
        const unitExist= await unitModel.findById(id)
        if(!unitExist){
            return req.status(404).json({message:"unit not found!."})
        }
        const updatedUnit={}
        if(unit){
            updatedUnit.unit=unit;
        }
        const updated=await unitModel.findByIdAndUpdate(id,{$set:updatedUnit},{runValidators:true,new:true})
        res.status(200).json({message:"unit details updated!..",updated})
    } catch (error) {
        return next(new ErrorHandler(error.message,404))
    }
}))


module.exports=router;