const mongoose= require("mongoose")

const mongodbConnect=( )=>{
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify:false
  }
    
).then((data)=>{
    console.log(`database working on : ${data.connection.host}`)
  })
  // .catch((err)=>{
  //   console.log(err);
    
  // })

}
module.exports=mongodbConnect;



// ,
//     "dev": "nodemon backend/server.js",
//     "build": "npm run build"