const mongoose=require("mongoose");

const ProductSchema= new mongoose.Schema({
    productname:{
        type:String,
        required:true,
    },
    productImage:{
        type:[String],
        required:true,
    },
    productDescription:{
        type:String,
        required:true,
        
    },
    unit:{
        type:String,
    },
    productquantity:{
        type:Number,
    
    },
    productMRP:{
        type:Number,
    },
    productCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
        default:null,
    }
})

module.exports= mongoose.model("Product",ProductSchema)