const mongoose=require("mongoose");
const orderSchema= new mongoose.Schema({
    order:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending","processing","delivered"],
    },
    price:{
        type:Number,
        required:true,
    }
})

module.exports=mongoose.model("order",orderSchema)