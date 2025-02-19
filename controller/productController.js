const express=require("express");
const catchAsyncError = require("../Middleware/catchAsyncError");
const ErrorHandler = require("../Utils/ErrorHandler");
const productModel=require("../Models/productModel");
const { upload } = require("../Multer");
const router=express.Router();

router.post("/add-product",upload.single("productImage"),catchAsyncError(async(req,res,next)=>{
    try {
        const {productname,productDescription,productquantity,productMRP}=req.body;
        if(!req.file){
            return res.status(404).json({message:"No file uploaded!"})
        }
        const filename=req.file.filename;
        const filepath=`uploads${filename}`;
        const fileurl=`http://localhost:4000/uploads/${filename}`
        const productDeials={productname,productImage:fileurl,productDescription,productquantity,productMRP};
        const product=await productModel.create(productDeials);
        if(!product){
            return res.status(404).json({message:"Product details not found"})
        }
        res.status(201).json({message:"product details added!",product})
  
    } catch (error) {
        return next(new ErrorHandler(error.message,404))
    }
}))

router.get("/get-products",catchAsyncError(async(req,res,next)=>{
    try {
        const getAllproducts=await productModel.find()
        res.status(200).json({getAllproducts})
        
    } catch (error) {
        return next(new ErrorHandler(error.message,404))
    }
}))

router.delete("/delete-product/:id",catchAsyncError(async(req,res,next)=>{
    try {
        const {id}=req.params;
        const deleteProduct=await productModel.findOneAndDelete({_id:id})
        res.status(200).json({message:"product deleted!"})
    } catch (error) {
        return next(new ErrorHandler(error.message,404))
    }
}))
router.get("/get-product/:id",catchAsyncError(async(req,res,next)=>{
   try {
       const{id}=req.params;
       const getproductId=await productModel.findById({_id:id})
       res.status(200).json({getproductId})
   } catch (error) {
      return next(new ErrorHandler(error.message,404))
   }
}))
router.patch("/edit-product/:id",upload.single("productImage"),catchAsyncError(async(req,res,next)=>{
    try {
        const{id}=req.params;
        const {productname,productDescription,productquantity,productImage,productMRP}=req.body;
        const productExist= await productModel.findById(id)
        if(!productExist){
            return req.status(404).json({message:"product not found!."})
        }
        const updatedProduct={}
        if(productname){
            updatedProduct.productname=productname;
        }
        if(productDescription){
            updatedProduct.productDescription=productDescription;
        }
        if(productquantity){
            updatedProduct.productquantity=productquantity;
        }
        if(productMRP){
            updatedProduct.productMRP=productMRP;
        }
        if(req.file){
            const filename=req.file.filename;
            const filepath=`uploads${filename}`;
            const fileurl=`http://localhost:4000/uploads/${filename}`
        
            updatedProduct.productImage=productImage;
        }
    const updated= await productModel.findByIdAndUpdate(id,{$set:updatedProduct},{runValidators:true,new:true})
    res.status(200).json({message:"product details updated!",updated})
        
    } catch (error) {
        return next(new ErrorHandler(error.message,404))
    }
}))
module.exports=router;