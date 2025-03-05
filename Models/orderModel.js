const mongoose=require("mongoose");
const orderSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    products:[{
    
        productname:{
            type:String,
            required:true,
        },
       unit:{
            type:String,
        },
        productquantity:{
            type:Number,
            default:1,
        
        },
        price:{
        type:Number,
    }
}],
   
    TotalAmount:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
      },
     OrderDate:{
        type:Date,
        default:Date.now(),
      },
      mobileNumber:{
        type:Number,
      },
    status:{
        type:String,
        default:"pending",
        enum:["pending","processing","delivered"],
    }
})

module.exports=mongoose.model("order",orderSchema)