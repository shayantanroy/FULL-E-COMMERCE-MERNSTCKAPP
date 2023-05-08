const mongoose=require("mongoose")
const validator=require("validator")
const bycript=require("bcryptjs")
const jwt=require("jsonwebtoken")
const crypto = require("crypto");



const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,"please enter your name"],
        maxLength:[30,"name cannot exced 30 characters"],
        minLength:[4,"name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"please enter your email"],
        unique:true,
        validate:[validator.isEmail,"please enter your valid email"]
    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        minLength:[8,"password should have more than 8 characters"],
        select:false,

    },
    avatar:{
        
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        },
        role:{
            type:String,
            default:"user",
        },
        createdAt:{
            type:Date,
            default:Date.now
           },
           
        resetPasswordToken:String,
        resetPasswordExpire:Date,



})
// password change into a hash code for security
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
        }
    this.password=await bycript.hash(this.password,10);

})
// JWT TOKEN create (for after registation user automatic login)
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}
// comparePassword
userSchema.methods.comparePassword=async function(enterpassword){
    return await bycript.compare(enterpassword,this.password)
}

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
    return resetToken;
  };

module.exports=mongoose.model("User",userSchema);