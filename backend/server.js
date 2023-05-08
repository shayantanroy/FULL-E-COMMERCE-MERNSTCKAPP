const app=require("./app")
// const dotenv=require("dotenv")
const mongodbconnect=require("./config/database")
const cloudinary=require("cloudinary");
// import Razorpay from 'razorpay'
const Razorpay=require('razorpay');

     

    process.on("uncaughtException",(err)=>{
        console.log(`Error : ${err.message}`)
        process.exit(1);
    })

// dotenv.config({path:"backend/config/config.env"})
if(process.env.NODE_ENV!=="PRODUCTION"){
   require("dotenv").config({path:"backend/config/config.env"})
}


// connect mongodb data base
mongodbconnect() 

// module.exports.instance= new Razorpay({
//     key_id: process.env.RAZORPAY_API_KEY,
//     key_secret: process.env.RAZORPAY_API_SECRET,
//   });







cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});


const server=app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);

// console.log(youtube)
    // unhandled promise rejection error
    process.on("unhandledRejection",(err)=>{
        console.log(`Error : ${err.message}`)
        console.log("shutting down server due to unhandled promise rejection")
        server.close(()=>{
            process.exit(1);
        })
    })

}); 