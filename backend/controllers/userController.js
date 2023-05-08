const User= require("../models/useModel");
const asyncCatcherr=require("../middleware/asyncCatcherr");
const errorhander=require("../utils/errorhander");
const sendtoken=require("../utils/jwtToken");
const sendEmail=require("../utils/sendEmail")
// const nodeMailer = require("nodemailer");
const crypto = require("crypto");
const cloudinary=require("cloudinary")


// regiter a user
exports.registerUser=asyncCatcherr(async(req,res,next)=>{
  const mycloud= await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder:"avatars",
    width:150,
    crop:"scale",
  });

    const {name,email,password}=req.body
    const user=await User.create({
      name,email,password,
        avatar:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url,
        }
    })
    // const token=user.getJWTToken();
    // res.status(201).json({
    //     success:true,
    //     // user,(not neceary)
    //     token
    // })
   sendtoken(user,201,res);

})
// login user
exports.loginUser=asyncCatcherr(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return next(new errorhander("please enter your email& password",400))
    }
    const user=await User.findOne({email:email}).select("+password")
    if(!user){
        return next(new errorhander("in valid email or password",401))
    }
    const isuserpassword=await user.comparePassword(password);
    if(!isuserpassword){
        return next(new errorhander("invalid email or password",401))
    }
    // const token=user.getJWTToken();
    // res.status(201).json({
    //     success:true,
    //     // user,
    //     token
    // })
    sendtoken(user,200,res);

})
// logout
exports.logoutUser=asyncCatcherr(async(req,res,next)=>{
    res.status(200).cookie("token",null,{expires:new Date(Date.now()),httpOnly:true}).json({
        success:true,
        message:"Log Out"
    })
})


// Forgot Password
exports.forgotPassword = asyncCatcherr(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
  
    if (!user) {
      return next(new errorhander("User not found", 401));
    }
  
    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
  
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken}`;


    // const resetPasswordUrl = `${process.env.FRONTENED_URL}/password/reset/${resetToken}`;(for experement purpose)
  
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: `Ecommerce Password Recovery`,
        message,
      });
  
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
  
      return next(new errorhander(error.message, 500));
    }
  });




  // reset password
  exports.resetpassword=asyncCatcherr(async(req,res,next)=>{
    const resetToken=crypto.createHash("sha256").update(req.params.token).digest("hex")
       const user= await User.findOne({resetPasswordToken:resetToken,resetPasswordExpire:{$gt:Date.now()} })
       if(!user){
        return next(new errorhander("reset token is expired or invalid",400))
       }
       if(req.body.password!==req.body.confirmPassword){
        return next(new errorhander("please check your password",400))
       }
        user.password=req.body.password;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({ validateBeforeSave: false })
        // await user.save();
        sendtoken(user,201,res);

      });





  // user details

exports.userDetails=asyncCatcherr(async(req,res,next)=>{
  const user=await User.findById(req.user.id);
     res.status(200).json({
      success:true,
      user,
    
     });
  
});

// for user only  update user
exports.updateuser=asyncCatcherr(async(req,res,next)=>{
  const newdata={
    name:req.body.name,
    email:req.body.email,
   
  }
  if(req.body.avatar !==""){
    const Iser=await User.findById(req.user.id);
    const imageId=Iser.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
  newdata.avatar={
    public_id:mycloud.public_id,
     url:mycloud.secure_url,

  } 
 }
  //  you can also use req.params.id
  // let user=await User.findById(req.user.id)

  // if(!user){
  //     return next(new errorhander("user not found",404));
  // }
  let user=await User.findByIdAndUpdate(req.user.id,newdata,{new:true,
      runValidators:true,
  useFindAndModify:false});
  
  res.status(200).json({
      succes:true,
      user
  })

})

// for admin only getallUser
exports.getalluser=asyncCatcherr(async(req,res,next)=>{
  const user=await User.find();
  res.status(200).json({
    succes:true,
    user
  })
})
// get single user --admin
exports.getsingleuser=asyncCatcherr(async(req,res,next)=>{
  const user=await User.findById(req.params.id);
  if(!user){
    return next(new errorhander("user is not found",401));
  }
  res.status(200).json({
    succes:true,
    user
  })
})

// update user role --admin
exports.updateuserrole=asyncCatcherr(async(req,res,next)=>{
  const newdata={
    name:req.body.name,
    email:req.body.email,
    role:req.body.role,
 
  }
  let user=await User.findById(req.params.id)
 
  if(!user){
      return next(new errorhander("user not found",401));
  }

  user=await User.findByIdAndUpdate(req.params.id,newdata,{new:true,
      runValidators:true,
  useFindAndModify:false});
  
  res.status(200).json({
      succes:true,
      user
  })

})



// delete user --admin
exports.deleteuser=asyncCatcherr(async(req,res,next)=>{
  const user=await User.findById(req.params.id)
 
  if(!user){
      return next(new errorhander("user not found",401));
  }
  await user.remove()
  res.status(200).json({
      succes:true,
      message:"user deleted"
  })

})


// // update User password
// exports.updatePassword = asyncCatcherr(async (req, res, next) => {
//   const user = await User.findById(req.user.id).select("+password");

//   const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

//   if (!isPasswordMatched) {
//     return next(new errorhander("Old password is incorrect", 400));
//   }

//   if (req.body.newPassword !== req.body.confirmPassword) {
//     return next(new errorhander("password does not match", 400));
//   }

//   user.password = req.body.newPassword;

//   await user.save();

//   sendtoken(user, 200, res);
// });



