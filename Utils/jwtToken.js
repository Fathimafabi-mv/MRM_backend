const sendToken = (user, statusCode , res) =>{
    const token = user.getJwtToken()
    //options for Cookies

    const options = {
    expires: new Date(Date.now()+90 *24*60 *60*1000),
    httpOnly:true,
    };
    res.status(statusCode).cookie('token' , token, options).json({success:true, user:{
        id:user._id,
        username:user.username,
        shopname:user.shopname,
        address:user.address,
        phonenumber:user.phonenumber,
        whatsappno:user.whatsappno,
        TRNno:user.TRNno,
        location:user.location,
        role:user.role,
        
    },token})
} ;

module.exports = sendToken