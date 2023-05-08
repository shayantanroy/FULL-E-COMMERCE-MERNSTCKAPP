
const express=require("express");
const app=express();
const path = require("path");



const cookie=require("cookie-parser")
const errormiddleware=require("./middleware/error")
const bodyparser=require("body-parser");
const fileUpload=require("express-fileupload");


// config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"})
 }

app.use(express.json());
app.use(cookie());
app.use(bodyparser.urlencoded({extended:true}));
app.use(fileUpload());

// route imports
const product=require("./routes/productRoute");
app.use("/api/v1",product);
const user=require("./routes/userRoute");
app.use("/api/v1",user);
const order=require("./routes/orderRoute");
app.use("/api/v1",order);

// app.use(express.static(path.join(__dirname, "../frontenedpage/build")));
// app.get("*",(req,res)=>{
//     res.sendFile(path.resolve(__dirname, "../frontenedpage/build/index.html"))
// })
app.use(express.static(path.join(__dirname,"..frontenedpage/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontenedpage/build/index.html"));
})
// app.get('*', function (req, res) {
//     const index = path.join(__dirname, 'build', 'index.html');
//     res.sendFile(index);
//   });


// middleware error
app.use(errormiddleware);


module.exports=app;