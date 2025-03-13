const express=require("express");
const catchAsyncError = require("../Middleware/catchAsyncError");
const ErrorHandler = require("../Utils/ErrorHandler");
const orderModel=require("../Models/orderModel")
const router=express.Router();
const mongoose=require("mongoose")

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
        const getOrder = await orderModel.aggregate([
            {
                $lookup: {
                    from: "users", // The users collection
                    localField: "userId",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails" // Convert array into an object
            },
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    "userDetails.username": 1, // Include username from users collection
                    products: 1,
                    TotalAmount: 1,
                    address: 1,
                    OrderDate: 1,
                    mobileNumber: 1,
                    status: 1
                }
            }
        ]);

        res.status(200).json({ getOrder });

        
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
        // const {id}=req.params;
        // const getOrderID=await orderModel.find({_id:id})
        // if(!getOrderID){
        //     return res.status(404).json({message:"Order not found!"})
        // }
        // res.status(200).json({getOrderID})

        const { id } = req.params;
        const getOrderID = await orderModel.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) } // Filter order by ID
            },
            {
                $lookup: {
                    from: "users", // Name of the users collection
                    localField: "userId",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails" // Convert array into an object
            },
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    "userDetails.username": 1, // Fetch username from users collection
                    products: 1,
                    TotalAmount: 1,
                    address: 1,
                    OrderDate: 1,
                    mobileNumber: 1,
                    status: 1
                }
            }
        ]);

        if (!getOrderID || getOrderID.length === 0) {
            return res.status(404).json({ message: "Order not found!" });
        }

        res.status(200).json({ getOrderID });

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