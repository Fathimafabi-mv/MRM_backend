const mongoose=require("mongoose");

const UnitSchema=new mongoose.Schema({
    unit:{
        type:String,
        required:true,
    }
})

module.exports=mongoose.model("unit",UnitSchema)