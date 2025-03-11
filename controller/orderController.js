const express=require("express");
const catchAsyncError = require("../Middleware/catchAsyncError");
const ErrorHandler = require("../Utils/ErrorHandler");
const orderModel=require("../Models/orderModel")
const router=express.Router();

router.post("/add-order",catchAsyncError(async(req,res,next)=>{
    try {
        const {userId,products,TotalAmount,address,OrderDate,mobileNumber,status}=req.body;
       
        // if(!userId||!products||!TotalAmount ||!address ||mobileNumber){
        //     return res.status(400).json({message:"missing required field "})
        // }
        const orderDetails={userId,products,TotalAmount,address,OrderDate,mobileNumber,status};
        const addOrder=await orderModel.create(orderDetails);
        if(!addOrder){
            return res.status(404).json({message:"No order details found!"})
        }
        res.status(201).json({message:"Order details Added!..",addOrder})
    } catch (error) {
        return next(new ErrorHandler(error.message,404))
    }
}))

router.get("/get-order",catchAsyncError(async(req,res,next)=>{
    try {
        const getOrder=await orderModel.find()
        res.status(200).json({getOrder})
       
        
    } catch (error) {
        return next(new ErrorHandler(error.message,404))
    }
}))
router.delete("/delete-order/:id",catchAsyncError(async(req,res,next)=>{
    try {
        const{id}=req.params;
        const deleteOrder=await orderModel.findOneAndDelete({_id:id})
        res.status(200).json({message:"order deleted successfully!"});
    } catch (error) {
        return next(new ErrorHandler(error.message,404))
    }
}))
router.get("/get-order/:id",catchAsyncError(async(req,res,next)=>{
    try {
        const {id}=req.params;
        const getOrderID=await orderModel.find({_id:id})
        if(!getOrderID){
            return res.status(404).json({message:"Order not found!"})
        }
        res.status(200).json({getOrderID})
    } catch (error) {
        return next(new ErrorHandler(error.message,404))
    }
}))
router.patch("/update-order/:id",catchAsyncError(async(req,res,next)=>{
    try {
        const{id}=req.params;
        const UpdatedOrder=await orderModel.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
        if(!UpdatedOrder){
            return res.status(404).json({message:`No order found this Id:${id}`})
        }
        res.status(200).json({success:true,message:`Order updated successfully`,UpdatedOrder})
    } catch (error) {
        return next(new ErrorHandler(error.message,404))
    }
}))
module.exports=router;