const express = require('express')
const catchAsyncError = require('../Middleware/catchAsyncError')
const ErrorHandler = require('../Utils/ErrorHandler')
const adminModel = require('../Models/adminModel')
const sendToken = require('../Utils/jwtToken')

const router = express.Router()

router.post('/admin-register',catchAsyncError(async (req,res,next) =>{
    try {
            const {username, password} = req.body
            const user = {username,password}
            
            const newUser = await adminModel.create(user)
            if(newUser){
                res.status(201).json({msg: "Registration success"})
            }

            
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
        
    }
}) )

router.post('/admin-login', catchAsyncError(async (req,res,next) => {
    try {
        const {username, password} = req.body
        if(!username || !password){
            return res.status(400).json({message: "username and password is required"})
        }
        const user = await adminModel.findOne({username}).select("+password")
        if(!user){
            return res.status(400).json({message: "Invalid username or password"})
        }
        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(400).json({message: "Invalid username or password"})
        }
        sendToken(user,200,res)
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}))

module.exports = router