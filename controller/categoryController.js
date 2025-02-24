const express=require("express");
const catchAsyncError = require("../Middleware/catchAsyncError");
const ErrorHandler = require("../Utils/ErrorHandler");
const { upload } = require("../Multer");
const categoryModel = require("../Models/categoryModel");
const router=express.Router();

router.post("/add-category",upload.single("categoryImage"),catchAsyncError(async(req,res,next)=>{
    try{
        const{ categoryname,Hascategory,subCategory}=req.body;
        if(!req.file){
            return res.status(400).json({message:"No file uploaded"})
        }
        const filename=req.file.filename;
        const filepath=`uploads${filename}`;
        const fileurl=`http://localhost:4000/uploads/${filename}`
        const categoryDetails={ categoryname,Hascategory,subCategory,categoryImage:fileurl}
        const category= await categoryModel.create(categoryDetails)
       if(!category){
        return res.status(404).json({message:"Categorydetails not found "})
       }
       res.status(200).json({message:"category created!",category})


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

router.delete("/delete-category/:id",catchAsyncError(async(req,res,next)=>{
    try {
          const {id}=req.params;
          const deleteCategory=await categoryModel.findOneAndDelete({_id:id})
          res.status(200).json({message:"category deleted!"});
    } catch (error) 
    {
     return next(new ErrorHandler(error.message,404));   
    }
}))
router.patch("/edit-category/:id",upload.single("categoryImage"),catchAsyncError(async(req,res,next)=>{
    try {
        const{id}=req.params;
        const{categoryname,categoryImage,Hascategory} = req.body
        const categoryExist = await categoryModel.findById(id)
        if(!categoryExist){
            return res.status(404).json({message: "category not found"})
        }
        const updateCategory = {}

        if(categoryname){
            updateCategory.categoryname = categoryname
        }

        if(Hascategory !== undefined){
            updateCategory.Hascategory = Hascategory
        }

        if(req.file){
            const filename=req.file.filename;
            const filepath=`uploads${filename}`;
            const fileurl=`http://localhost:4000/uploads/${filename}`
           
            updateCategory.categoryImage = fileurl
        }

        const updated = await categoryModel.findByIdAndUpdate(id, {$set:updateCategory},{
            runValidators: true, new: true
        })
        res.status(200).json({message: "category updated",updated})
    } catch (error) {
        return next(new ErrorHandler(error.message,404));
    }
})
)

router.get("/get-subcategory/:id",catchAsyncError(async(req,res,next)=>{
    try {
        const {id}=req.params;
        const getSubcategory=await categoryModel.find({subCategory:id})
        res.status(200).json({getSubcategory})
    } catch (error) {
        
    }
}))

module.exports=router




