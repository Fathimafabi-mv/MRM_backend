const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({


    category_name:{
        type:String
    },

    category_img:{
        type:String
    },

    hasSubcategory:{
        type:Boolean
    }
})

module.exports = mongoose.model("category", categorySchema)