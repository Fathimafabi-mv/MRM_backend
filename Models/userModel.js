const mongoose=require("mongoose");
const bcrypt=require("bcryptjs")

const AdminSchema=new mongoose.Schema({
  username:{
        type:String,
        unique:true,
        required:[true,"Username is required"],
        trim:true,
        minlength:[4,"username must be alteast 4 character"],
        maxlength:[20,"username is not more than 20 character"],
  },
  password:{
        type:String,
        select:false,
        trim:true,
        required:true,
        minlength:[6,"password must be atleast 6 character"],

  },
  shopname:{
    type:String,
    required:true,
    
  },
  address:{
    type:String,
    required:true,
  },
  phonenumber:{
    type:Number,
    required:true, 
  },
  whatsappno:{
    type:Number,
    required:true,
    
  },
  TRNno:{
    type:String,
    required:true,
   
  },
  location:{
    type:String,
    required:true,
    
  },
  role:{
    type:String,
    default:"user",
    enum:["admin","user"],
    
  },
  createdAt:{
    type:Date,
    default:Date.now(),
  }
},{
    timestamps:true
})


AdminSchema.pre("save", async function(next){
    if(!this.isModified("password")){
      next()
      
    }
    this.password = await bcrypt.hash(this.password, 10)
  } )

  AdminSchema.methods.comparePassword= async function (enterpassword) {
    return await  bcrypt.compare(enterpassword, this.password )
}
module.exports=mongoose.model("Admin",AdminSchema);