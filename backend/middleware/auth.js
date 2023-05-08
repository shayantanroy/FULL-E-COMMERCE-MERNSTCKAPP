const asyncCatcherr=require("../middleware/asyncCatcherr");
const errorhander=require("../utils/errorhander");
const jwt=require("jsonwebtoken")
const User=require("../models/useModel")

exports.isAuthenticatedUser=asyncCatcherr(async(req,res,next)=>{
    const {token}=req.cookies;
    // console.log(token);
    if(!token){
        return  next (new errorhander("please login to this resources",401))

        // next()
    }
    const decodedata=jwt.verify(token,process.env.JWT_SECRET);
    // here (req.user or req.a or req.b or....) store the User
  req.user= await User.findById(decodedata.id);
    next();
})
// admin authorise
exports.authoriseRole=asyncCatcherr(async(req,res,next)=>{
    if(req.user.role!="admin"){
        next(new errorhander(`Role:${req.user.role} is not allowed to acess the resources`,401))

    }
    next();
})
