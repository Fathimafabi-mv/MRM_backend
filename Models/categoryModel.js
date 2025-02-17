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
    }
})

module.exports=mongoose.model("category",categorySchema)