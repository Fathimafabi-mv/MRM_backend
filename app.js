const express=require("express");
const connectedDB = require("./DB/connectionDB");
const userRouter = require("./controller/authController");
const adminRouter = require("./controller/adminController")
const dotenv=require("dotenv").config();
const cors = require('cors')

const app=express();
app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    res.send("home")
})


app.use("/api/v1/",userRouter)
app.use("/api/v1/", adminRouter)

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
