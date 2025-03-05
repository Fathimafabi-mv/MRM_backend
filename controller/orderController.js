const express=require("express");
const catchAsyncError = require("../Middleware/catchAsyncError");
const ErrorHandler = require("../Utils/ErrorHandler");
const orderModel=require("../Models/orderModel")
const router=express.Router();

router.post("/add-order",catchAsyncError(async(req,res,next)=>{
    try {
        const {order,status,price}=req.body;
        console.log(" vbn",req.body);
        
        // const ExistingOrder=await orderModel.findOne({order})
        // if(ExistingOrder){
        //     return res.status(200).json({message:"order already exist!"})
        // }
        if(!order  || !price){
            return res.status(400).json({message:"mssing required field "})
        }
        const orderDetails={order,status,price};
        const addOrder=await orderModel.create(orderDetails);
        
        
        
        if(!addOrder){
            return res.status(404).json({message:"No order details found!"})
        }
        res.status(201).json({message:"order details created!..",addOrder})
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
module.exports=router;