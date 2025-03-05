const express=require("express");
const userModel = require("../Models/userModel");
const ErrorHandler = require("../Utils/ErrorHandler");
const catchAsyncError = require("../Middleware/catchAsyncError");
const router=express.Router();


router.post("/register",catchAsyncError( async(req,res,next)=>{
    
    try {
        const{username,password,shopname,address,phonenumber,whatsappno,TRNno,location,role,createdAt}=req.body;
        const newUser={username,password,shopname,address,phonenumber,whatsappno,TRNno,location,role,createdAt};
        const existUsername=await userModel.findOne({username})
        if(existUsername){
            return res.status(400).json({message:"user already exist"});
        }
        
        const user= await userModel.create(newUser);

        if(!user){
      return res.status(404).json({message:"Registration failed"})
            
        }

        res.status(201).json({message:"User registered sucessfully"});
    } catch (error) {
       return next(new ErrorHandler(error.message,400))
    }

}))

router.post("/login",catchAsyncError(async(req,res,next)=>{
    try {
        const{username,password}=req.body;
        if(!username || !password){
            return res.status(400).json({message:"Username and password is required"});
        }
        const user= await userModel.findOne({username}).select("+password")
        if(!user){
           return res.status(400).json({message:"Invalid username or password"});
        }
        const isMatch=await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid username or password"});
        }
        res.status(200).json({message:"Login completed sucessfully"})
    } catch (error) {
        return next (new ErrorHandler(error.message,400))
        
    }
   

}))
router.get("/getusers",catchAsyncError(async(req,res, next)=>{
    try {
        const allUser = await userModel.find()
        return res.status(200).json(
            {allUser}
        )
    } catch (error) {
        return next(new ErrorHandler(error.message,400))
    }
}))

router.delete("/deleteuser/:id", catchAsyncError(async(req,res,next)=>{
    try {
        const {id} = req.params
        const user = await userModel.findByIdAndDelete(id)
        return res.status(200).json({message: "user dealeted", user})
    } catch (error) {
        return next(new ErrorHandler(error.message,400))
    }
}))

router.patch('/updateuser/:id', catchAsyncError(async(req,res,next)=>{
    try {
        const {id} = req.params
        const {username,shopname,address,phonenumber,whatsappno,TRNno,location} = req.body

        const updateUser = {}
        if(username) updateUser.username = username
        if(shopname) updateUser.shopname = shopname
        if(address) updateUser.address = address
        if(location) updateUser.location = location
        if(phonenumber) updateUser.phonenumber = phonenumber
        if(whatsappno) updateUser.whatsappno = whatsappno
        if(TRNno) updateUser.TRNno = TRNno
        const user = await userModel.findByIdAndUpdate(id, updateUser, {new: true, runValidators: true})

        return res.status(200).json({message: "user updated", user})
    } catch (error) {
        return next(new ErrorHandler(error.message,400))
    }
}))




module.exports=router