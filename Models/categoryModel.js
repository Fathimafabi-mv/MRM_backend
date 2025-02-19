const mongoose=require("mongoose");

const categorySchema=new mongoose.Schema({
    categoryname:{
        type:String,

    },
    categoryImage:{
         type:String,
    },
    Hascategory:{
        type:Boolean,
    },
    subCategory:{
        type:mongoose.Schema.Types.ObjectId,  //referencing the objectid of category
        ref:"category",
        default:null,
    }
})

module.exports=mongoose.model("category",categorySchema)