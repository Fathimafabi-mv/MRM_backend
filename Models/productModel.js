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
    productquantity:{
        type:String,
    
    },
    productMRP:{
        type:String,
    },
    productCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
        default:null,
    }
})

module.exports= mongoose.model("Product",ProductSchema)