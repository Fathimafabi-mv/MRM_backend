const mongoose=require("mongoose");

const ProductSchema= new mongoose.Schema({
    productname:{
        type:String,
        required:true,
    },
    productImage:{
        type:String,
        required:true,
    },
    productDescription:{
        type:String,
        required:true,
        minlength:[4,"username must be alteast 4 character"],
    },
    productquantity:{
        type:Number,
        required:true,
    },
    productMRP:{
        type:Number,
    },
})

module.exports= mongoose.model("Product",ProductSchema)