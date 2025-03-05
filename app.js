const express=require("express");
const connectedDB = require("./DB/connectionDB");
const userRouter = require("./controller/authController");
const adminRouter = require("./controller/adminController");
const productRouter=require("./controller/productController");
const unitRouter=require("./controller/unitController");
const orderRouter=require("./controller/orderController")
const dotenv=require("dotenv").config();
const cors = require('cors')
const categoryRouter=require("./controller/categoryController");
const path=require("path");
const { upload } = require("./Multer");
const app=express();
app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    res.send("home")
})


app.use("/api/v1/",userRouter)
app.use("/api/v1/", adminRouter)
app.use("/api/v1/",categoryRouter)
app.use("/api/v1/",productRouter)
app.use("/api/v1/",unitRouter)
app.use("/api/v1/",orderRouter)
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
const start=async()=>{
    try {
        await connectedDB();
        app.listen(process.env.PORT,()=>{
            console.log(`Server is listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log(error);
        
    }
}
start();

module.exports=app;
