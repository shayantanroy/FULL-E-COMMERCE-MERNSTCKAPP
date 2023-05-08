const mongoose=require("mongoose")
const productSchema= new  mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter the product name"],
        trim:true
    },

    description:{
        type:String,
        required:[true,"please enter the description"]
    },
    price:{
        type:Number,
        required:[true,"please enter the price"],
        maxLength:[7,"price can't exceed 7 characters"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }


   ],
  
   category:{
    type:String,
    required:[true,"please enter the product category"]
   },
   Stock:{
    type:Number,
    required:[true,"please enter the product stock"],
    maxLength:[4,"stock cant't exceed 4 characters"],
    default:1
   },
   numOfReviews:{
    type:Number,
    default:0
   },
   
   reviews:[
    {
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true,
        
           },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }
   ],
   user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,

   },
   createdAt:{
    type:Date,
    default:Date.now
   },

})
module.exports=mongoose.model("Product",productSchema);