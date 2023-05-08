// const mongoose= require("mongoose");
const ErrorHander=require("../utils/errorhander")


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

// cast error or id error in postman or mongodb errror handling
if(err.name==="CastError"){
  const message=`resources not valid in ${err.path}`
  err=new ErrorHander(message,400);
}
// duplicate email
// mongoose duplicate key error
if(err.code===11000){
  const message=`Duplicate ${Object.keys(err.keyValue)} entered`
  err=new ErrorHander(message,400);
}
if(err.name==="JsonWebTokenError"){
  const message=`json webtoken is invalid try again`
  err=new ErrorHander(message,400);
}
if(err.name==="TokenExpiredError"){
  const message=`json webtoken is expired try again`
  err=new ErrorHander(message,400);
}
    res.status(err.statusCode).json({
        success: false,
        // error:err,
        message: err.message,
      });
    };