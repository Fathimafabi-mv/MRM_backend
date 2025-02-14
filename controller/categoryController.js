const express=require("express");
const catchAsyncError = require("../Middleware/catchAsyncError");
const ErrorHandler = require("../Utils/ErrorHandler");
const { upload } = require("../Multer");
const categoryModel = require("../Models/categoryModel");
const router=express.Router();

router.post("/add-category",upload.single("categoryImage"),catchAsyncError(async(req,res,next)=>{
    try{
        const{ categoryname,Hascategory}=req.body;
        if(!req.file){
            return res.status(400).json({message:"No file uploaded"})
        }
        const filename=req.file.filename;
        const filepath=`uploads${filename}`;
        const fileurl=`http://localhost:4000/uploads/${filename}`
        const categoryDetails={ categoryname,Hascategory,categoryImage:fileurl}
        const category= await categoryModel.create(categoryDetails)
       if(!category){
        return res.status(404).json({message:"Categorydetails not found "})
       }
       res.status(200).json({message:"category created!"})


    }catch(error){
        return next(new ErrorHandler(error.message,404))
    }
}))

router.get("/get-category",catchAsyncError(async(req,res,next)=>{
    try {
        const getAllcategory=await categoryModel.find()
        res.status(200).json({getAllcategory})
    } catch (error) {
        return next(new ErrorHandler(error.message,404))
    }
}))




module.exports=router




